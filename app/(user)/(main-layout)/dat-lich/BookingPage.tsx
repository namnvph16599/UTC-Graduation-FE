'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { DateTimePickerForm } from '@/components/ui/datetime-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultipleSelect } from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { REGEX } from '@/src/constants/regex';
import { cn } from '@/src/constants/utils';
import { useCreateRepairRequestMutation } from '@/src/graphql/mutations/createRepairRequest.generated';
import { RepairDocument } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';
import {
  BrandEntity,
  CreateRepairInput,
  MotorcycleEntity,
  RepairStatusEnum,
  ServicesEntity,
  UserEntity,
} from '@/src/graphql/type.interface';

const formSchema = z
  .object({
    phone: z
      .string({
        message: validationMessages.required,
      })
      .regex(REGEX.phone, {
        message: validationMessages.invalidPhone,
      }),
    name: z
      .string({
        message: validationMessages.required,
      })
      .min(1, {
        message: validationMessages.required,
      }),
    brand_id: z
      .string({
        message: validationMessages.required,
      })
      .min(1, {
        message: validationMessages.required,
      }),
    model_id: z
      .string({
        message: validationMessages.required,
      })
      .min(1, {
        message: validationMessages.required,
      }),
    manufacture_year: z.string({ message: validationMessages.required }).min(4, {
      message: validationMessages.minLength(4),
    }),
    capacity: z
      .string({
        message: validationMessages.required,
      })
      .min(3, {
        message: validationMessages.minLength(3),
      }),
    license_plate: z
      .string({
        message: validationMessages.required,
      })
      .min(5, {
        message: validationMessages.minLength(5),
      }),
    service_ids: z
      .array(z.string(), {
        required_error: validationMessages.required,
      })
      .min(1, {
        message: validationMessages.required,
      }),
    customer_description: z.string().optional(),
    estimated_delivery_time: z.date().optional(),
    expected_receiving_time: z.date().optional(),
    showSelectingMyVehicle: z.string().optional(),
    vehicle_id: z.string().optional(),
  })
  .refine(
    (values) => {
      if (!values.estimated_delivery_time) return true;
      return dayjs(values.estimated_delivery_time).isAfter(dayjs());
    },
    {
      message: 'Thời gian giao xe phải lớn hơn thời gian hiện tại',
      path: ['estimated_delivery_time'], // path
    },
  )
  .refine(
    (values) => {
      if (!values.expected_receiving_time) return true;
      return dayjs(values.expected_receiving_time).isAfter(dayjs());
    },
    {
      message: 'Thời gian nhận xe phải lớn hơn thời gian hiện tại',
      path: ['expected_receiving_time'], // path
    },
  )
  .refine(
    (values) => {
      if (!values.expected_receiving_time || !values.estimated_delivery_time) return true;
      return dayjs(values.expected_receiving_time).isAfter(values.estimated_delivery_time);
    },
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
  const router = useRouter();

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
      showSelectingMyVehicle: 'default',
    },
  });

  const currentBrandId = form.watch('brand_id');
  const currentModelId = form.watch('model_id');
  const currentShowSelectingMyVehicle = form.watch('showSelectingMyVehicle');

  const disabledTypingInformationOfMotorcycle = useMemo(
    () => currentShowSelectingMyVehicle === 'myVehicle',
    [currentShowSelectingMyVehicle],
  );

  const modelOptions = useMemo(
    () =>
      (brands.find((b) => b.id === currentBrandId)?.models ?? []).map((m) => ({
        label: m.name,
        value: m.id,
      })),
    [brands, currentBrandId],
  );

  const [createRepairRequestMutation, { loading: creating }] = useCreateRepairRequestMutation({
    onCompleted() {
      toast.success('Đặt lịch yêu cầu sữa chữa thành công!');
      if (user) {
        router.push(AppRouter.user.authenticatePages.repairRequest.path);
      } else {
        window.location.reload();
      }
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [RepairCollectionDocument, RepairDocument],
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      const input: CreateRepairInput = {
        capacity: Number(data.capacity),
        manufacture_year: data.manufacture_year,
        license_plate: data.license_plate,
        model_id: data.model_id,
        name: data.name,
        phone: data.phone,
        description_of_customer: data?.customer_description,
        service_ids: data.service_ids,
        vehicle_id: data.vehicle_id,
        estimated_delivery_time: data.estimated_delivery_time,
        expected_receiving_time: data.expected_receiving_time,
        status: RepairStatusEnum.WAITING_FOR_CONFIRM,
        user_id: user?.id,
      };
      await createRepairRequestMutation({
        variables: { input },
      });
    },
    [createRepairRequestMutation, user?.id],
  );

  useEffect(() => {
    if (!currentBrandId) {
      form.setValue('model_id', '');
    }
  }, [currentBrandId, form]);

  useEffect(() => {
    if (currentModelId && currentBrandId) {
      const isExited = modelOptions.find((m) => m.value === currentModelId);
      if (!isExited) {
        form.setValue('model_id', '');
      }
    }
  }, [currentBrandId, currentModelId, form, modelOptions]);

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
              name='service_ids'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel required>Dịch vụ sửa chữa</FormLabel>
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
            <div
              className={cn({
                hidden: !user,
              })}>
              <FormField
                control={form.control}
                name='showSelectingMyVehicle'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Chọn xe</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className='flex flex-col space-y-1'
                        defaultValue={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);

                          form.setValue('brand_id', '');
                          form.setValue('model_id', '');
                          form.setValue('license_plate', '');
                          form.setValue('manufacture_year', '');
                          form.setValue('capacity', '');
                        }}>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={'default'} />
                          </FormControl>
                          <FormLabel className='font-normal'>Mặc định</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='myVehicle' />
                          </FormControl>
                          <FormLabel className='font-normal'>Xe của tôi</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn({
                hidden: !user,
              })}>
              <FormField
                control={form.control}
                name='vehicle_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Xe của tôi</FormLabel>
                    <FormControl>
                      <Combobox
                        className='block'
                        disabled={currentShowSelectingMyVehicle == 'default'}
                        {...field}
                        onChange={(val) => {
                          field.onChange(val);

                          const motorcycle = myMotorcycles?.find((it) => it.id === val);
                          if (!motorcycle) return;

                          form.setValue('brand_id', motorcycle?.model?.brand?.id ?? '');
                          form.setValue('model_id', motorcycle?.model?.id ?? '');
                          form.setValue('license_plate', motorcycle?.license_plate ?? '');
                          form.setValue('manufacture_year', motorcycle?.manufacture_year ?? '');
                          form.setValue('capacity', motorcycle?.capacity?.toString() ?? '');
                        }}
                        options={motorcycleOptions}
                        removable={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='brand_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Hãng xe</FormLabel>
                  <FormControl>
                    <Combobox
                      className='block'
                      disabled={disabledTypingInformationOfMotorcycle}
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
              name='model_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Dòng xe</FormLabel>
                  <FormControl>
                    <Combobox
                      className='block'
                      disabled={disabledTypingInformationOfMotorcycle}
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
                      disabled={disabledTypingInformationOfMotorcycle}
                      placeholder='Nhập dung tích'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='manufacture_year'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Năm sản xuất</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-white'
                      disabled={disabledTypingInformationOfMotorcycle}
                      maxLength={4}
                      placeholder='Nhập năm sản xuất'
                      type='number'
                      {...field}
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
                    <Input
                      className='bg-white'
                      disabled={disabledTypingInformationOfMotorcycle}
                      placeholder='Nhập biển số xe'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
        <div className='flex justify-end pt-6'>
          <Button className='px-8 text-white' form='booking-form' loading={creating}>
            Đặt lịch
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookingPage;
