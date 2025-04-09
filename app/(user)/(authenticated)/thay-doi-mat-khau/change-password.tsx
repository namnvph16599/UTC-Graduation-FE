'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';
import { useUserChangePasswordMutation } from '@/src/graphql/mutations/userChangePassword.generated';

const formSchema = z
  .object({
    passwordConfirm: z
      .string({
        message: validationMessages.required,
      })
      .min(6, {
        message: validationMessages.minLength(6),
      }),
    passwordNew: z
      .string({
        message: validationMessages.required,
      })
      .min(6, {
        message: validationMessages.minLength(6),
      }),
    passwordOld: z
      .string({
        message: validationMessages.required,
      })
      .min(6, {
        message: validationMessages.minLength(6),
      }),
  })
  .refine((data) => data.passwordOld !== data.passwordNew, {
    message: 'Mật khẩu mới và mật khẩu hiện tại trùng nhau',
    path: ['passwordNew'],
  })
  .refine((data) => data.passwordNew === data.passwordConfirm, {
    message: 'Mật khẩu không trùng khớp',
    path: ['passwordConfirm'],
  });

export const ChangePassword = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [changePasswordMutation, { loading }] = useUserChangePasswordMutation({
    onCompleted() {
      toast.success('Thay đổi mật khẩu thành công!', {
        description: 'Bạn phải đăng nhập lại để tiếp tục sử dụng',
      });
      logout();
      router.push(AppRouter.auth.login);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) =>
      await changePasswordMutation({
        variables: {
          input: data,
        },
      }),
    [changePasswordMutation],
  );

  return (
    <div className='container mx-auto'>
      <AppBreadcrumb
        className='px-0 mb-4'
        isAdmin={false}
        isUser={true}
        items={[
          {
            label: 'Thay đổi mật khẩu',
            href: '#',
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 items-start gap-6'>
            <FormField
              control={form.control}
              name='passwordOld'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Mật khẩu cũ</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Nhập mật khẩu cũ' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordNew'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Nhập mật khẩu mới' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='Nhập xác nhận mật khẩu' {...field} />
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
    </div>
  );
};
