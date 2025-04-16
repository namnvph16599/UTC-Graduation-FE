'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { AppInformation, AppRouter, validationMessages } from '@/src/constants/constant';
import { ErrorMessage } from '@/src/constants/error';
import { REGEX } from '@/src/constants/regex';
import { useRegisterByPhoneMutation } from '@/src/graphql/mutations/registerByPhone.generated';
import { useVerifyOtpRegisterAccountByPhoneMutation } from '@/src/graphql/mutations/verifyOtpRegisterAccountByPhone.generated';

const formSchema = z
  .object({
    phone: z
      .string({
        message: validationMessages.required,
      })
      .min(10, {
        message: 'Số điện thoại không đúng định dạng',
      })
      .regex(REGEX.phone, {
        message: validationMessages.invalidPhone,
      }),
    password: z
      .string({
        message: validationMessages.required,
      })
      .min(6, {
        message: 'Mật khẩu ít nhất 6 ký tự',
      }),
    passwordConfirm: z
      .string({
        message: validationMessages.required,
      })
      .min(6, {
        message: 'Mật khẩu ít nhất 6 ký tự',
      }),
  })
  .refine((values) => values.password == values.passwordConfirm, {
    message: 'Mật khẩu không trùng nhau',
    path: ['passwordConfirm'],
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState('');

  const [registerMutation, { loading }] = useRegisterByPhoneMutation({
    onCompleted(data) {
      const id = data?.registerByPhone?.uuid;
      if (!id) return;
      setUuid(id);
      setOpen(true);
    },
    onError(error) {
      toast.error('Đăng ký thất bại!', {
        description: error.message,
      });
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      await registerMutation({
        variables: {
          input: {
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            phone: data.phone,
            phonePrefix: '',
          },
        },
      });
    },
    [registerMutation],
  );

  return (
    <div>
      <Form {...form}>
        <form className='w-[580px] mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className='text-3xl mb-7 font-semibold'>Đăng ký</h1>
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
                  <PasswordInput placeholder='Nhập mật khẩu' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mb-6' />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Nhập lại mật khẩu' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full mt-8' loading={loading} type='submit'>
            Đăng ký
          </Button>
          <div className='flex items-center justify-center gap-1 text-sm mt-9'>
            <span>Bạn đã có tài khoản? </span>
            <Link className='underline hover:text-primary-default' href={AppRouter.auth.login}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </Form>
      <DialogConfirmOTP open={open} setOpen={setOpen} uuid={uuid} />
    </div>
  );
}

const otpSchema = z.object({
  otp: z
    .string({
      message: validationMessages.required,
    })
    .min(6, {
      message: validationMessages.required,
    }),
});

type DialogConfirmOTPProps = {
  open: boolean;
  uuid: string;
  setOpen: (value: boolean) => void;
};

const DialogConfirmOTP = ({ open, setOpen, uuid }: DialogConfirmOTPProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const [verifyMutation, { loading }] = useVerifyOtpRegisterAccountByPhoneMutation({
    onCompleted() {
      toast.success('Đăng ký thành công. Vui lòng đăng nhập để sử dụng');
      setOpen(false);
      router.push(AppRouter.auth.login);
    },
    onError(error) {
      toast.error(ErrorMessage.default, {
        description: error.message,
      });
    },
  });

  async function onSubmit(data: z.infer<typeof otpSchema>) {
    await verifyMutation({
      variables: {
        input: {
          userId: uuid,
          otpCode: data.otp,
        },
      },
    });
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className='w-[625px]'>
        <DialogHeader>
          <DialogTitle>Nhập mã xác thực</DialogTitle>
          <DialogDescription>
            Để đăng nhập bạn cần xác thức số điện thoại đã đăng kí với {AppInformation.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='confirm-otp-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <div className='flex justify-center'>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot className='w-16 h-12' index={0} />
                          <InputOTPSlot className='w-16 h-12' index={1} />
                          <InputOTPSlot className='w-16 h-12' index={2} />
                          <InputOTPSlot className='w-16 h-12' index={3} />
                          <InputOTPSlot className='w-16 h-12' index={4} />
                          <InputOTPSlot className='w-16 h-12' index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormDescription>Hãy nhập mã xác thực được gửi vào số điện thoại đã đăng ký của bạn</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form='confirm-otp-form' loading={loading} type='submit'>
            Xác thực
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
