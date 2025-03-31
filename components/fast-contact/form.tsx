'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validationMessages } from '@/src/constants/constant';
import { REGEX } from '@/src/constants/regex';
const validationSchema = z.object({
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: validationMessages.invalidEmail,
    }),
  fullName: z
    .string({ message: validationMessages.required })
    .min(6, { message: validationMessages.minLength(6) })
    .max(50, {
      message: validationMessages.maxLength(50),
    }),
  phone: z
    .string({
      message: validationMessages.required,
    })
    .min(10, { message: validationMessages.minLength(10) })
    .regex(REGEX.phone, {
      message: validationMessages.invalidPhone,
    }),
  description: z.string({ message: validationMessages.required }).min(6, { message: validationMessages.minLength(6) }),
});

type Props = {
  onFinishSubmit?: () => void;
};

export const FormFastContact = memo(({}: Props) => {
  const form = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      //   email: userAuth?.email ?? undefined,
      //   fullName: userAuth?.name ?? undefined,
      //   phone: userAuth?.phone ?? undefined,
      //   serviceTypeId: defaultOptionId ?? undefined,
    },
  });

  const onSubmit = useCallback((values: unknown) => {}, []);

  return (
    <Form {...form}>
      <form
        className='grid grid-cols-2 items-start gap-6  mt-4'
        id='repair-form'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='border-none bg-white' placeholder='Nhập họ và tên' {...field} />
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
              <FormControl>
                <Input className='border-none bg-white' maxLength={10} placeholder='Nhập số điện thoại' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormControl>
                <Input className='border-none bg-white' maxLength={255} placeholder='Nhập email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormControl>
                <Textarea className='border-none bg-white' placeholder='Nhập nội dung' rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='col-span-2 flex justify-center items-center w-full mt-4'>
          <Button className='text-white w-full text-base font-semibold' type='submit'>
            Gửi thông tin liên hệ
          </Button>
        </div>
      </form>
    </Form>
  );
});

FormFastContact.displayName = 'FormFastContact';
