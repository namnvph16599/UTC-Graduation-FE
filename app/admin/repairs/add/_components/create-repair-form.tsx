'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { DateTimePickerForm } from '@/components/ui/datetime-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultipleSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

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
  brand: z.string().optional(),
  estimated_delivery_time: z.date().optional(),
  expected_receiving_time: z.date().optional(),
  serviceIds: z.array(z.string()).optional(),
  productIds: z.array(z.string()).optional(),
  discount_percent: z.number().optional(),
  year: z.number().optional(),
  customerDescription: z.string().optional(),
  description: z.string().optional(),
});

type Props = {};

export const CreateRepairForm = (props: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  console.log('form.getValues ', form.getValues());

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log('data', data);
  }, []);
  return (
    <>
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white mb-[93px]'>
          <Form {...form}>
            <form
              className='grid grid-cols-2 items-start gap-6'
              id='repair-form'
              onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên khách hàng</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tên khách hàng' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder='Số điện thoại' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hãng xe</FormLabel>
                      <FormControl>
                        <Combobox
                          className='block'
                          {...field}
                          onChange={(val) => field.onChange(val)}
                          options={[
                            {
                              value: 'next.js',
                              label: 'Next.js',
                            },
                            {
                              value: 'sveltekit',
                              label: 'SvelteKit',
                            },
                            {
                              value: 'nuxt.js',
                              label: 'Nuxt.js',
                            },
                            {
                              value: 'remix',
                              label: 'Remix',
                            },
                            {
                              value: 'astro',
                              label: 'Astro',
                            },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dòng xe</FormLabel>
                      <FormControl>
                        <Combobox
                          className='block'
                          {...field}
                          onChange={(val) => field.onChange(val)}
                          options={[
                            {
                              value: 'next.js',
                              label: 'Next.js',
                            },
                            {
                              value: 'sveltekit',
                              label: 'SvelteKit',
                            },
                            {
                              value: 'nuxt.js',
                              label: 'Nuxt.js',
                            },
                            {
                              value: 'remix',
                              label: 'Remix',
                            },
                            {
                              value: 'astro',
                              label: 'Astro',
                            },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dung tích</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập dung tích' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Năm sản xuất</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập năm sản xuất' type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Biển số xe</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập biển số xe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='estimated_delivery_time'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                      <FormLabel>Thời gian dự kiến giao xe</FormLabel>
                      <DateTimePickerForm field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='expected_receiving_time'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-1'>
                      <FormLabel>Thời gian dự kiến nhận xe</FormLabel>
                      <DateTimePickerForm field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='customerDescription'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Ghi chú của khách hàng</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Nhập ghi chú của khách hàng' rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='serviceIds'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Dịch vụ sửa chữa</FormLabel>
                      <FormControl>
                        <MultipleSelect
                          className='block'
                          defaultValue={field.value}
                          onValueChange={(val) => field.onChange(val)}
                          options={[
                            {
                              value: 'next.js',
                              label: 'Next.js',
                            },
                            {
                              value: 'sveltekit',
                              label: 'SvelteKit',
                            },
                            {
                              value: 'nuxt.js',
                              label: 'Nuxt.js',
                            },
                            {
                              value: 'remix',
                              label: 'Remix',
                            },
                            {
                              value: 'astro',
                              label: 'Astro',
                            },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='productIds'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Phụ tùng thay thế</FormLabel>
                      <MultipleSelect
                        className='block'
                        defaultValue={field.value}
                        onValueChange={(val) => field.onChange(val)}
                        options={[
                          {
                            value: 'next.js',
                            label: 'Next.js',
                          },
                          {
                            value: 'sveltekit',
                            label: 'SvelteKit',
                          },
                          {
                            value: 'nuxt.js',
                            label: 'Nuxt.js',
                          },
                          {
                            value: 'remix',
                            label: 'Remix',
                          },
                          {
                            value: 'astro',
                            label: 'Astro',
                          },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='discount_percent'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giảm giá(%)</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập giảm giá' type='input' {...field} />
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
                      <FormLabel>Ghi chú</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Nhập ghi chú' rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
