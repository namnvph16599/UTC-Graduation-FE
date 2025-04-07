'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validationMessages } from '@/src/constants/constant';
import { useUpdateContactMutation } from '@/src/graphql/mutations/updateContact.generated';
import { useContactQuery } from '@/src/graphql/queries/contact.generated';
import { ContactCollectionDocument } from '@/src/graphql/queries/contactCollection.generated';
import { ContactStatusEnum } from '@/src/graphql/type.interface';
import { TDetailPageProps } from '@/src/types';
import { convertContactStatusEnum } from '@/src/utils/convert-enum.util';

const formSchema = z.object({
  name: z.string({}),
  phone: z.string({}),
  content: z.string({}),
  email: z.string({}).optional(),
  note: z.string({}).optional(),
  status: z.enum(Object.values(ContactStatusEnum) as [string, ...string[]], {
    message: validationMessages.required,
  }),
});

export const ContactForm = ({ id }: TDetailPageProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { loading, refetch } = useContactQuery({
    variables: {
      id: id ?? '',
    },
    skip: !id,
    onCompleted(data) {
      const defaultValues = data?.contact;
      form.setValue('content', defaultValues?.content);
      form.setValue('name', defaultValues?.name);
      form.setValue('phone', defaultValues?.phone);
      form.setValue('email', defaultValues?.email ?? '');
      form.setValue('status', defaultValues?.status);
      form.setValue('note', defaultValues?.note);
    },
  });

  const [updateAsync, { loading: updating }] = useUpdateContactMutation({
    onCompleted() {
      toast.success('Cập nhật thành công!');
      refetch();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [ContactCollectionDocument],
  });

  const onSubmit = useCallback(
    async (input: z.infer<typeof formSchema>) => {
      if (!id) return;
      await updateAsync({
        variables: {
          input: {
            id: id,
            status: input.status as ContactStatusEnum,
            note: input.note,
          },
        },
      });
    },
    [id, updateAsync],
  );

  return (
    <Loading loading={loading}>
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white mb-[93px] mx-auto'>
          <Form {...form}>
            <form
              className='grid grid-cols-1 items-start gap-6'
              id='repair-form'
              onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-10'>
                <div className='flex flex-col gap-5'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên khách hàng</FormLabel>
                        <FormControl>
                          <Input disabled placeholder='Nhập tên khách hàng' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input disabled placeholder='Nhập Số điện thoại' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled placeholder='Nhập email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung</FormLabel>
                        <FormControl>
                          <Textarea disabled placeholder='Nhập nội dung' rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-5'>
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Trạng thái</FormLabel>
                        <FormControl>
                          <Combobox
                            className='block'
                            {...field}
                            onChange={(val) => field.onChange(val)}
                            options={[
                              {
                                label: convertContactStatusEnum(ContactStatusEnum.DEFAULT),
                                value: ContactStatusEnum.DEFAULT,
                                disable: true,
                              },
                              {
                                label: 'Hủy',
                                value: ContactStatusEnum.CANCELLED,
                              },
                              {
                                label: convertContactStatusEnum(ContactStatusEnum.HANDLED),
                                value: ContactStatusEnum.HANDLED,
                              },
                            ]}
                            removable={false}
                            searchable={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='note'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl>
                          <Textarea placeholder='Nhập Ghi chú' rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className='fixed left-0 right-0 bottom-0 flex items-center justify-end gap-4 px-6 py-3 border-t border-[#eee] bg-white'>
        <Button onClick={() => router.back()} variant='outline'>
          Hủy
        </Button>
        <Button form='repair-form' loading={updating} type='submit'>
          Lưu
        </Button>
      </div>
    </Loading>
  );
};
