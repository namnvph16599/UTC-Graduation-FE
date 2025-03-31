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
import { Input, InputFormatter } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { numberWithDots, numberWithUnDots } from '@/src/constants/utils';
import { useCreateServiceMutation } from '@/src/graphql/mutations/createService.generated';
import { useUpdateServiceMutation } from '@/src/graphql/mutations/updateService.generated';
import { ServiceDocument, useServiceQuery } from '@/src/graphql/queries/service.generated';
import { ServiceCollectionDocument } from '@/src/graphql/queries/serviceCollection.generated';

const formSchema = z.object({
  name: z.string({
    message: 'Tên dịch vụ là trường bắt buộc',
  }),
  price: z
    .string({
      message: 'Giá là trường bắt buộc',
    })
    .refine((price) => Number(price) > 0, {
      message: 'Giá tiền không hợp lệ',
    }),
  description: z.string().optional(),
});

export const CreateServiceForm = ({ id }: { id?: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { loading } = useServiceQuery({
    variables: {
      id: id ?? '',
    },
    skip: !id,
    onCompleted(data) {
      const values = data?.service;
      form.setValue('description', values?.description ?? '');
      form.setValue('name', values?.name);
      form.setValue('price', values?.price?.toString());
    },
  });

  const [updateServiceMutation, { loading: updating }] = useUpdateServiceMutation({
    onCompleted() {
      toast.error('Cập nhật thành công!');
      router.back();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [ServiceCollectionDocument, ServiceDocument],
  });

  const [creatingServiceMutation, { loading: creating }] = useCreateServiceMutation({
    onCompleted() {
      toast.error('Thêm mới thành công!');
      router.back();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [ServiceCollectionDocument, ServiceDocument],
  });

  const onSubmit = useCallback(
    async (input: z.infer<typeof formSchema>) => {
      const data = {
        ...input,
        price: Number(input.price),
      };
      if (id) {
        return await updateServiceMutation({
          variables: {
            args: {
              id: id,
              ...data,
            },
          },
        });
      }

      return await creatingServiceMutation({
        variables: {
          args: data,
        },
      });
    },
    [creatingServiceMutation, id, updateServiceMutation],
  );

  return (
    <Loading loading={loading}>
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white mb-[93px] max-w-[600px] mx-auto'>
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
                    <FormLabel>Tên dịch vụ</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên dịch vụ' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá dịch vụ</FormLabel>
                    <FormControl>
                      <InputFormatter
                        formatValue={numberWithDots}
                        placeholder='Nhập giá dịch vụ'
                        unFormatValue={numberWithUnDots}
                        {...field}
                      />
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
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Nhập mô tả' rows={4} {...field} />
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
  );
};
