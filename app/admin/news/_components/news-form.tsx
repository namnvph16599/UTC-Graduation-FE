'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { LexicalEditor } from '@/components/lexical-editor/Lexical';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { IS_CLIENT } from '@/src/constants/env';
import { REGEX } from '@/src/constants/regex';
import { useCreateNewsMutation } from '@/src/graphql/mutations/createNews.generated';
import { useUpdateNewsMutation } from '@/src/graphql/mutations/updateNews.generated';
import { NewsDocument, useNewsQuery } from '@/src/graphql/queries/news.generated';
import { NewsCollectionDocument } from '@/src/graphql/queries/newsCollection.generated';
import { TDetailPageProps } from '@/src/types';
import { checkValidImage } from '@/src/utils/test-image-address.util';

const formSchema = z.object({
  title: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  content: z.any({
    message: validationMessages.required,
  }),
  description: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  image_url: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    })
    .regex(REGEX.imageAddress, {
      message: 'Đường dẫn không hợp lệ',
    }),
});

const NewsForm = ({ id }: TDetailPageProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { loading } = useNewsQuery({
    variables: {
      id: id ?? '',
    },
    skip: !id,
    onCompleted(data) {
      const values = data?.news;
      form.setValue('description', values?.description ?? '');
      form.setValue('title', values?.title);
      form.setValue('image_url', values?.image_url);
      form.setValue('content', values?.content);
    },
  });

  const [updateServiceMutation, { loading: updating }] = useUpdateNewsMutation({
    onCompleted() {
      toast.error('Cập nhật thành công!');
      router.push(AppRouter.admin.news.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [NewsCollectionDocument, NewsDocument],
  });

  const [creatingServiceMutation, { loading: creating }] = useCreateNewsMutation({
    onCompleted() {
      toast.error('Thêm mới thành công!');
      router.push(AppRouter.admin.news.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [NewsCollectionDocument, NewsDocument],
  });

  const onSubmit = useCallback(
    async (input: z.infer<typeof formSchema>) => {
      const data = {
        ...input,
        content: JSON.stringify(input.content),
      };
      if (id) {
        return await updateServiceMutation({
          variables: {
            input: {
              id: id,
              ...data,
            },
          },
        });
      }

      return await creatingServiceMutation({
        variables: {
          input: data,
        },
      });
    },
    [creatingServiceMutation, id, updateServiceMutation],
  );

  const previewImage = useCallback(() => {
    const formValues = form.getValues();
    const image_url = formValues.image_url;

    const isValid = checkValidImage(image_url);
    if (!isValid) return null;
    return <Image alt='' className='object-fill rounded' height={100} src={image_url} width={200} />;
  }, [form]);

  if (!IS_CLIENT) return null;

  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.news.label,
            href: AppRouter.admin.news.list,
          },
          {
            label: id ? 'Chỉnh sửa' : 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <Loading loading={loading}>
        <div className='p-5 bg-[#F9F9F9]'>
          <div className='p-5 bg-white mb-[93px]'>
            <Form {...form}>
              <form
                className='grid grid-cols-1 items-start gap-6'
                id='repair-form'
                onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tiêu đề' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Mô tả</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập mô tả' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='image_url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Hình ảnh</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập hình ảnh' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {previewImage()}

                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Nội dung</FormLabel>
                      <FormControl>
                        <LexicalEditor
                          dataInit={field.value ?? ''}
                          onChange={(newData) => {
                            form.setValue('content', newData.toJSON() as unknown as string);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className='fixed left-0 right-0 bottom-0 flex items-center justify-end gap-4 px-6 py-3 border-t border-[#eee] bg-white'>
          <Button onClick={() => router.back()} variant='outline'>
            Hủy
          </Button>
          <Button disabled={updating || creating} form='repair-form'>
            {id ? 'Lưu' : 'Thêm mới'}
          </Button>
        </div>
      </Loading>
    </div>
  );
};

export default NewsForm;
