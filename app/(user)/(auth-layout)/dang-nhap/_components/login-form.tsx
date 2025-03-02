'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  phone: z
    .string({
      message: 'Số điện thoại là trường bắt buộc',
    })
    .min(10, {
      message: 'Số điện thoại không đúng định dạng',
    }),
  password: z
    .string({
      message: 'Mật khẩu là trường bắt buộc',
    })
    .min(6, {
      message: 'Mật khẩu ít nhất 6 ký tự',
    }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log('data', data);
  }, []);

  return (
    <Form {...form}>
      <form className='w-[580px] mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className='text-3xl mb-7 font-semibold'>Đăng nhập</h1>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder='Nhập số điện thoại' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mb-6' />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder='Nhập mật khẩu' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mb-8 mt-3 flex justify-end'>
          <p className='underline text-sm text-[#202C38]'>Quên mật khẩu</p>
        </div>

        <Button className='w-full' disabled={form.formState.isValid} type='submit'>
          Đăng nhập
        </Button>
        <div className='flex items-center justify-center gap-1 text-sm mt-9'>
          <span>Bạn chưa có tài khoản? </span>
          <Link className='underline hover:text-primary-default' href={'/dang-ky'}>
            Đăng ký
          </Link>
        </div>
      </form>
    </Form>
  );
}
