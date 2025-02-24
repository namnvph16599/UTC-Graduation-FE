'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UploadImage } from '@/components/ui/upload-image';

const formSchema = z.object({
  name: z.string({
    message: 'Đây là trường bắt buộc',
  }),
  priority_number: z.number({
    message: 'Đây là trường bắt buộc',
  }),
  image: z.string({
    message: 'Đây là trường bắt buộc',
  }),
  active: z.boolean({}),
});

export const BannerForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority_number: 0,
      active: true,
      // image: 'https://picsum.photos/400/400',
    },
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
                    <FormLabel>Tên banner</FormLabel>
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
                    <FormLabel>Độ ưu tiên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập độ ưu tiên' {...field} />
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
                    <UploadImage error={form.formState.errors.image?.message} field={field} />
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
        <Button form='repair-form'>Thêm mới</Button>
      </div>
    </>
  );
};
