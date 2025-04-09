'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { DateTimePickerForm } from '@/components/ui/datetime-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultipleSelect } from '@/components/ui/multi-select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { BrandEntity, MotorcycleEntity, ServicesEntity, UserEntity } from '@/src/graphql/type.interface';

const formSchema = z
  .object({
    phone: z
      .string({
        message: 'Số điện thoại là trường bắt buộc',
      })
      .min(10, {
        message: 'Số điện thoại không đúng định dạng',
      }),
    name: z
      .string({
        message: 'Họ và tên là trường bắt buộc',
      })
      .min(6, {
        message: 'Họ và tên ít nhất 6 ký tự',
      }),
    brand: z
      .string({
        message: 'Hãng xe là trường bắt buộc',
      })
      .min(1, {
        message: 'Hãng xe là trường bắt buộc',
      }),
    model: z
      .string({
        message: 'Dòng xe là trường bắt buộc',
      })
      .min(6, {
        message: 'Dòng xe là trường bắt buộc',
      }),
    capacity: z.number({
      message: 'Dung tích là trường bắt buộc',
    }),
    year: z.number({
      message: 'Năm sản xuất là trường bắt buộc',
    }),
    license_plate: z
      .string({
        message: 'Biển số xe là trường bắt buộc',
      })
      .min(4, {
        message: 'Biển số xe là trường bắt buộc',
      }),
    serviceIds: z
      .array(z.string(), {
        required_error: 'Dịch vụ sửa chữa là trường bắt buộc',
      })
      .min(1, {
        message: 'Dịch vụ sửa chữa là trường bắt buộc',
      }),
    customer_description: z.string().optional(),
    estimated_delivery_time: z.date().optional(),
    expected_receiving_time: z.date().optional(),
    showSelectingMyVehicle: z.boolean().optional(),
    vehicle_id: z.string().optional(),
  })
  .refine(
    (values) =>
      values.expected_receiving_time &&
      values.estimated_delivery_time &&
      dayjs(values.expected_receiving_time).isAfter(values.estimated_delivery_time),
    {
      message: 'Thời gian nhận xe phải lớn hơn thời gian giao xe',
      path: ['expected_receiving_time'], // path
    },
  );

type Props = {
  user?: UserEntity | null;
  services?: ServicesEntity[];
  brands?: BrandEntity[];
  myMotorcycles?: MotorcycleEntity[];
};

const BookingPage = ({ brands = [], services = [], myMotorcycles = [], user }: Props) => {
  const brandOptions = useMemo(
    () =>
      brands.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [brands],
  );

  const serviceOptions = useMemo(
    () =>
      services.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [services],
  );

  const motorcycleOptions = useMemo(
    () =>
      myMotorcycles.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [myMotorcycles],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName ?? '',
      phone: user?.phoneNumber ?? '',
      showSelectingMyVehicle: false,
    },
  });

  const currentBrandId = form.watch('brand');
  const currentModelId = form.watch('model');
  const currentShowSelectingMyVehicle = form.watch('showSelectingMyVehicle');

  console.log('currentShowSelectingMyVehicle', currentShowSelectingMyVehicle);

  const modelOptions = useMemo(
    () =>
      (brands.find((b) => b.id === currentBrandId)?.models ?? []).map((m) => ({
        label: m.name,
        value: m.id,
      })),
    [brands, currentBrandId],
  );

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log('data', data);
  }, []);
  return (
    <div className='container mx-auto p-10 bg-[#f1f1f1] rounded-[32px] mt-10'>
      <Form {...form}>
        <form className='grid grid-cols-2 items-start gap-6' id='booking-form' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Tên khách hàng</FormLabel>
                  <FormControl>
                    <Input className='bg-white' placeholder='Nhập tên khách hàng' {...field} />
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
                  <FormLabel required>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input className='bg-white' maxLength={10} placeholder='Số điện thoại' {...field} />
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
                  <DateTimePickerForm field={field} hourTypes='day' />
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
                  <DateTimePickerForm field={field} hourTypes='day' />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='serviceIds'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Dịch vụ sửa chữa</FormLabel>
                  <FormControl>
                    <MultipleSelect
                      className='block bg-white hover:bg-white'
                      defaultValue={field.value}
                      onValueChange={(val) => field.onChange(val)}
                      options={serviceOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='customer_description'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea className='bg-white' placeholder='Nhập ghi chú' rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <FormField
              control={form.control}
              name='showSelectingMyVehicle'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Chọn xe của tôi</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='vehicle_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Xe của tôi</FormLabel>
                  <FormControl>
                    <Combobox
                      className='block'
                      disabled={currentShowSelectingMyVehicle == true}
                      {...field}
                      onChange={(val) => field.onChange(val)}
                      options={motorcycleOptions}
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
                  <FormLabel required>Hãng xe</FormLabel>
                  <FormControl>
                    <Combobox
                      className='block'
                      disabled={currentShowSelectingMyVehicle == true}
                      {...field}
                      onChange={(val) => field.onChange(val)}
                      options={brandOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Dòng xe</FormLabel>
                  <FormControl>
                    <Combobox
                      className='block'
                      disabled={currentShowSelectingMyVehicle == true}
                      {...field}
                      onChange={(val) => field.onChange(val)}
                      options={modelOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Dung tích</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-white'
                      placeholder='Nhập dung tích'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
                    />
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
                  <FormLabel required>Năm sản xuất</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-white'
                      maxLength={4}
                      placeholder='Nhập năm sản xuất'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='license_plate'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel required>Biển số xe</FormLabel>
                  <FormControl>
                    <Input className='bg-white' placeholder='Nhập biển số xe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
        <div className='flex justify-end pt-6'>
          <Button className='px-8 text-white' form='booking-form'>
            Đặt lịch
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingPage;
