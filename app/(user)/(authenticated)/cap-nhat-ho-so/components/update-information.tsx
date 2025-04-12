'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validationMessages } from '@/src/constants/constant';
import { REGEX } from '@/src/constants/regex';
import { useAuth } from '@/src/contexts';
import { useUpdateUserInformationMutation } from '@/src/graphql/mutations/updateUserInformation.generated';
import { MeDocument } from '@/src/graphql/queries/me.generated';

const formSchema = z.object({
  fullName: z
    .string({
      message: validationMessages.required,
    })
    .min(6, {
      message: validationMessages.minLength(6),
    }),
  email: z
    .string({
      message: validationMessages.required,
    })
    .regex(REGEX.email, {
      message: validationMessages.invalidEmail,
    }),
  phoneNumber: z
    .string({
      message: validationMessages.required,
    })
    .regex(REGEX.phone, {
      message: validationMessages.invalidPhone,
    }),
});

export const UpdateInformation = () => {
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [changePasswordMutation, { loading }] = useUpdateUserInformationMutation({
    onCompleted() {
      toast.success('Cập nhật thông tin thành công!');
      router.refresh();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [MeDocument],
  });

  const onSubmit = useCallback(
    async ({ phoneNumber: _, ...data }: z.infer<typeof formSchema>) =>
      await changePasswordMutation({
        variables: {
          input: data,
        },
      }),
    [changePasswordMutation],
  );

  useEffect(() => {
    form.setValue('email', user?.email ?? '');
    form.setValue('fullName', user?.fullName ?? '');
    form.setValue('phoneNumber', user?.phoneNumber ?? '');
  }, [form, user?.email, user?.fullName, user?.phoneNumber]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 items-start gap-6'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Họ và tên</FormLabel>
                <FormControl>
                  <Input className='bg-white' placeholder='Nhập họ và tên' {...field} />
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
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input className='bg-white' placeholder='Nhập email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Số điện thoại</FormLabel>
                <FormControl>
                  <Input className='bg-white' disabled placeholder='Nhập số điện thoại' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end items-center gap-5 mt-10'>
          <Button className='px-10' loading={loading} size={'md'} type='submit'>
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
};
