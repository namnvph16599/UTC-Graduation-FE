'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UploadImage } from '@/components/ui/upload-image';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { useCreateBannerMutation } from '@/src/graphql/mutations/createBanner.generated';
import { useUpdateBannerMutation } from '@/src/graphql/mutations/updateBanner.generated';
import { BannerDocument, useBannerQuery } from '@/src/graphql/queries/banner.generated';
import { BannerCollectionDocument } from '@/src/graphql/queries/bannerCollection.generated';
import { CreateBannerInput } from '@/src/graphql/type.interface';
import { useUploadFileMutation } from '@/src/hooks/mutations/useUploadImageMutation';
import { TDetailPageProps } from '@/src/types';

const formSchema = z.object({
  name: z.string({
    message: validationMessages.required,
  }),
  priority_number: z.string({
    message: validationMessages.required,
  }),
  image: z.string({
    message: validationMessages.required,
  }),
  active: z.boolean({}),
  file: z.instanceof(File).optional(),
});

export const BannerForm = ({ id }: TDetailPageProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority_number: '1',
      active: true,
    },
  });

  const { loading } = useBannerQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
    onCompleted(data) {
      const defaultData = data?.banner;
      form.setValue('active', defaultData?.active);
      form.setValue('image', defaultData?.image);
      form.setValue('priority_number', defaultData?.priority_number.toString());
      form.setValue('name', defaultData?.name);
    },
  });

  const { mutateAsync: uploadImage, isPending: uploadingImage } = useUploadFileMutation({
    onError(error) {
      toast.error('Tải ảnh thất bại', {
        description: error.message,
      });
    },
  });

  const [updateMutation, { loading: updating }] = useUpdateBannerMutation({
    onCompleted() {
      toast.success('Cập nhật thành công!');
      router.push(AppRouter.admin.banners.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [BannerCollectionDocument, BannerDocument],
  });

  const [createMutation, { loading: creating }] = useCreateBannerMutation({
    onCompleted() {
      toast.success('Thêm mới thành công!');
      router.push(AppRouter.admin.banners.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [BannerCollectionDocument, BannerDocument],
  });

  const onSubmit = useCallback(
    async ({ file, ...data }: z.infer<typeof formSchema>) => {
      let image = data.image;

      if (file) {
        const uploadedFile = await uploadImage({
          file: file as File,
        });

        image = uploadedFile.url;
      }

      const input: CreateBannerInput = {
        ...data,
        priority_number: Number(data.priority_number),
        image,
      };

      if (id) {
        return await updateMutation({
          variables: {
            args: {
              id: id,
              ...input,
            },
          },
        });
      }

      return await createMutation({
        variables: {
          args: input,
        },
      });
    },
    [createMutation, id, updateMutation, uploadImage],
  );

  return (
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tên banner</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên banner' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='priority_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Độ ưu tiên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập độ ưu tiên' type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <UploadImage
                      error={form.formState.errors.image?.message}
                      field={{
                        ...field,
                        onChange: (v?: File) => {
                          form.setValue('image', v?.name ?? '');
                          form.setValue('file', v);
                        },
                      }}
                      height={500}
                      required
                      width={1360}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='active'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Kích hoạt</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
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
        <Button form='repair-form' loading={creating || updating || uploadingImage}>
          Lưu
        </Button>
      </div>
    </Loading>
  );
};
