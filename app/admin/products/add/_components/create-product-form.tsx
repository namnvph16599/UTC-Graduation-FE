'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputFormatter } from '@/components/ui/input';
import { numberWithDots, numberWithUnDots } from '@/lib/utils';

const formSchema = z.object({
  name: z.string({
    message: 'Tên phụ tùng là trường bắt buộc',
  }),
  price: z
    .string({
      message: 'Giá tiền là trường bắt buộc',
    })
    .refine((price) => Number(price) > 0, {
      message: 'Giá tiền không hợp lệ',
    }),
  quantity: z.string({
    message: 'Giá là trường bắt buộc',
  }),
});

export const CreateProductForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log('data', data);
  }, []);
  return (
    <>
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
                    <FormLabel>Tên phụ tùng</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên phụ tùng' {...field} />
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
                    <FormLabel>Giá phụ tùng</FormLabel>
                    <FormControl>
                      <InputFormatter
                        formatValue={numberWithDots}
                        placeholder='Nhập giá phụ tùng'
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
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <InputFormatter
                        formatValue={numberWithDots}
                        placeholder='Nhập số lượng'
                        unFormatValue={numberWithUnDots}
                        {...field}
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
        <Button form='repair-form'>Thêm mới</Button>
      </div>
    </>
  );
};
