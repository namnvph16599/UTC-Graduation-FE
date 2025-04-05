'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ModalCancelRepair } from '@/app/admin/repairs/add/_components/modal-cancel-repair';
import { RenderFeeOfRepair } from '@/app/admin/repairs/add/_components/render-fee-of-repair';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { DateTimePickerForm } from '@/components/ui/datetime-picker';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultipleSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';
import { useCreateRepairRequestMutation } from '@/src/graphql/mutations/createRepairRequest.generated';
import { useUpdateRepairRequestMutation } from '@/src/graphql/mutations/updateRepairRequest.generated';
import { useBrandCollectionQuery } from '@/src/graphql/queries/brandCollection.generated';
import {
  ProductCollectionDocument,
  useProductCollectionQuery,
} from '@/src/graphql/queries/productCollection.generated';
import { RepairDocument, useRepairQuery } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';
import { useServicesQuery } from '@/src/graphql/queries/services.generated';
import { useUserCollectionByAdminQuery } from '@/src/graphql/queries/userCollectionByAdmin.generated';
import { RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { TDetailPageProps } from '@/src/types';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';

const productSchema = z.object({
  id: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  quantity: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
});

const formSchema = z.object({
  phone: z
    .string({
      message: validationMessages.required,
    })
    .min(10, {
      message: validationMessages.required,
    }),
  name: z
    .string({
      message: validationMessages.required,
    })
    .min(6, {
      message: 'Tên khách hàng ít nhất 6 ký tự',
    }),
  brand_id: z.string({ message: validationMessages.required }).min(1, {
    message: validationMessages.required,
  }),
  model_id: z.string({ message: validationMessages.required }).min(1, {
    message: validationMessages.required,
  }),
  staff_id: z.string({ message: validationMessages.required }).min(1, {
    message: validationMessages.required,
  }),
  estimated_delivery_time: z.date().optional(),
  expected_receiving_time: z.date().optional(),
  service_ids: z.array(z.string()).optional(),
  products: z.array(productSchema).optional(),
  discount_percent: z.string().optional(),
  manufacture_year: z.string({ message: validationMessages.required }),
  description_of_customer: z.string().optional(),
  description: z.string().optional(),
  cancelled_description: z.string().optional(),
  capacity: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  license_plate: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  status: z.enum(Object.values(RepairStatusEnum) as [string, ...string[]], {
    message: validationMessages.required,
  }),
});

export const CreateRepairForm = ({ id }: TDetailPageProps) => {
  const router = useRouter();

  const { data: staffData } = useUserCollectionByAdminQuery({
    variables: {
      paginationArgs: {
        limit: 1000000,
        page: 1,
      },
    },
  });
  const staffOptions = useMemo(
    () =>
      (staffData?.userCollectionByAdmin?.items ?? []).map((u) => ({
        label: (u.fullName ?? u.phoneNumber) as string,
        value: u.id,
      })),
    [staffData?.userCollectionByAdmin?.items],
  );

  const { data: serviceData } = useServicesQuery();
  const serviceOptions = useMemo(
    () =>
      (serviceData?.services ?? []).map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [serviceData?.services],
  );

  const { data: brandData } = useBrandCollectionQuery({
    variables: {
      pagination: {
        limit: 10000,
        page: 1,
      },
    },
  });

  const brands = useMemo(() => brandData?.brandCollection?.items ?? [], [brandData?.brandCollection?.items]);

  const brandOptions = useMemo(
    () =>
      brands.map((s) => ({
        label: s.name,
        value: s.id,
      })),
    [brands],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: RepairStatusEnum.CONFIRMED,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
    keyName: 'tempId',
  });
  const watchFieldArray = form.watch('products');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });

  const { data: productData } = useProductCollectionQuery({
    variables: {
      paginationArgs: {
        limit: 100000,
        page: 1,
      },
    },
  });

  const productOptions = useMemo(
    () =>
      (productData?.productCollection?.items ?? []).map((v) => ({
        label: v.name + '(' + v.quantity + ')',
        value: v.id,
        disable: !!controlledFields.find((i) => i.id == v.id),
      })),
    [controlledFields, productData?.productCollection?.items],
  );

  const currentBrandId = form.watch('brand_id');

  const modelOptions = useMemo(
    () =>
      (brands.find((b) => b.id === currentBrandId)?.models ?? []).map((m) => ({
        label: m.name,
        value: m.id,
      })),
    [brands, currentBrandId],
  );

  const { data, loading } = useRepairQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
    onCompleted(data) {
      const defaultData = data?.repair;
      form.setValue('brand_id', defaultData?.model?.brand?.id ?? '');
      form.setValue('model_id', defaultData?.model?.id ?? '');
      form.setValue('capacity', defaultData?.capacity.toString());
      form.setValue('description', defaultData?.description ?? '');
      form.setValue('description_of_customer', defaultData?.description_of_customer ?? '');
      form.setValue('discount_percent', defaultData?.discount_percent?.toString());
      form.setValue(
        'estimated_delivery_time',
        defaultData?.estimated_delivery_time ? dayjs(defaultData?.estimated_delivery_time).toDate() : undefined,
      );
      form.setValue(
        'expected_receiving_time',
        defaultData?.expected_receiving_time ? dayjs(defaultData?.expected_receiving_time).toDate() : undefined,
      );
      form.setValue('license_plate', defaultData?.license_plate);
      form.setValue('manufacture_year', defaultData?.manufacture_year?.toString());
      form.setValue('name', defaultData?.name ?? '');
      form.setValue('phone', defaultData?.phone ?? '');
      form.setValue(
        'products',
        (defaultData?.products ?? []).map((p) => ({ id: p.product.id, quantity: p.quantity.toString() })),
      );
      form.setValue(
        'service_ids',
        (defaultData?.services ?? []).map((p) => p.service.id),
      );
      form.setValue('status', defaultData?.status);
      form.setValue('staff_id', defaultData?.staff?.id ?? '');
      form.setValue('cancelled_description', defaultData?.cancelled_description ?? '');
    },
  });

  const repair = useMemo(() => data?.repair, [data?.repair]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  const [updateRepairRequestMutation, { loading: updating }] = useUpdateRepairRequestMutation({
    onCompleted() {
      toast.error('Cập nhật thành công!');
      router.push(AppRouter.admin.repairs.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [RepairCollectionDocument, RepairDocument, ProductCollectionDocument],
  });

  const [createRepairRequestMutation, { loading: creating }] = useCreateRepairRequestMutation({
    onCompleted() {
      toast.error('Thêm mới thành công!');
      router.push(AppRouter.admin.repairs.list);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [RepairCollectionDocument, RepairDocument, ProductCollectionDocument],
  });

  const onSubmit = useCallback(
    async ({ brand_id: _, ...data }: z.infer<typeof formSchema>) => {
      if (id) {
        return await updateRepairRequestMutation({
          variables: {
            input: {
              id,
              ...data,
              discount_percent: Number(data?.discount_percent),
              capacity: Number(data.capacity),
              products: (data.products ?? []).map((p) => ({ id: p.id, quantity: Number(p.quantity) })),
              status: data?.status as RepairStatusEnum,
            },
          },
        });
      }
      return await createRepairRequestMutation({
        variables: {
          input: {
            ...data,
            discount_percent: Number(data?.discount_percent),
            capacity: Number(data.capacity),
            products: (data.products ?? []).map((p) => ({ id: p.id, quantity: Number(p.quantity) })),
            status: data?.status as RepairStatusEnum,
          },
        },
      });
    },
    [createRepairRequestMutation, id, updateRepairRequestMutation],
  );

  useEffect(() => {
    if (!currentBrandId) {
      form.setValue('model_id', '');
    }
  }, [currentBrandId, form]);

  return (
    <Loading loading={loading}>
      <AppBreadcrumb
        items={[
          {
            label: 'Yêu cầu sữa chữa',
            href: AppRouter.admin.repairs.list,
          },
          {
            label: id ? 'Chỉnh sửa' : 'Thêm mới',
            href: '#',
          },
        ]}
        rightContent={
          !!repair?.status &&
          [RepairStatusEnum.WAITING_FOR_CONFIRM, RepairStatusEnum.CONFIRMED].includes(repair?.status) && (
            <Button onClick={() => setOpenModalCancel(true)} size={'md'} variant={'redOutline'}>
              Từ chối
            </Button>
          )
        }
      />
      {openModalCancel && repair?.id && (
        <ModalCancelRepair id={repair?.id} open={openModalCancel} setOpen={setOpenModalCancel} />
      )}
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='grid grid-cols-10 gap-8'>
          <div
            className={cn(' p-5 bg-white mb-[93px]', {
              'col-span-8': !!id,
              'col-span-10': !id,
            })}>
            <Form {...form}>
              <form
                className='grid grid-cols-2 items-start gap-6'
                id='repair-form'
                onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Tên khách hàng</FormLabel>
                        <FormControl>
                          <Input placeholder='Nhập tên khách hàng' {...field} />
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
                          <Input placeholder='Số điện thoại' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='brand_id'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Hãng xe</FormLabel>
                        <FormControl>
                          <Combobox
                            className='block'
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
                          <Input placeholder='Nhập dung tích' {...field} />
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
                          <Input placeholder='Nhập năm sản xuất' type='number' {...field} />
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
                    name='description_of_customer'
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
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='staff_id'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Nhân viên phụ trách</FormLabel>
                          <FormControl>
                            <Combobox
                              className='block'
                              {...field}
                              onChange={(val) => field.onChange(val)}
                              options={staffOptions}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='col-span-2'>
                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Trạng thái</FormLabel>
                          <FormControl>
                            <Combobox
                              className='block'
                              {...field}
                              onChange={(val) => field.onChange(val)}
                              options={[
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.CANCELLED),
                                  value: RepairStatusEnum.CANCELLED,
                                  disable: true,
                                },
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.WAITING_FOR_CONFIRM),
                                  value: RepairStatusEnum.WAITING_FOR_CONFIRM,
                                },
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.CONFIRMED),
                                  value: RepairStatusEnum.CONFIRMED,
                                },
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.HANDLING),
                                  value: RepairStatusEnum.HANDLING,
                                },
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.WAITING_FOR_PAYMENT),
                                  value: RepairStatusEnum.WAITING_FOR_PAYMENT,
                                },
                                {
                                  label: convertRepairStatusEnum(RepairStatusEnum.FINISHED),
                                  value: RepairStatusEnum.FINISHED,
                                },
                              ]}
                              removable={false}
                              searchable={false}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='service_ids'
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>Dịch vụ sửa chữa</FormLabel>
                        <FormControl>
                          <MultipleSelect
                            className='block'
                            defaultValue={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            options={serviceOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='col-span-2'>
                    <FormLabel required>Phụ tùng thay thế</FormLabel>
                    {controlledFields.map((field, index) => {
                      const product = (productData?.productCollection?.items ?? []).find((p) => p.id === field.id);
                      const currentProduct = (repair?.products ?? []).find((p) => p.product.id === field.id);
                      const maxQuantity = Number(product?.quantity ?? 0) + Number(currentProduct?.quantity ?? 0);

                      return (
                        <div className='grid grid-cols-9 items-center gap-4 mt-2' key={field.tempId}>
                          <div className='col-span-6'>
                            <FormField
                              control={form.control}
                              name={`products.${index}.id`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Combobox
                                      className='block'
                                      {...field}
                                      onChange={(val) => field.onChange(val)}
                                      options={productOptions}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className='col-span-2'>
                            <FormField
                              control={form.control}
                              name={`products.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem className='w-full'>
                                  <FormControl>
                                    <Input
                                      max={maxQuantity}
                                      min={1}
                                      placeholder='Nhập số lượng'
                                      type='number'
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                              rules={{
                                min: {
                                  value: 1,
                                  message: 'Số lượng tối thiểu là 1',
                                },
                                max: {
                                  value: maxQuantity,
                                  message: `Số lượng tối đa là ${maxQuantity}`,
                                },
                              }}
                            />
                          </div>
                          <CircleX
                            className={cn({
                              'hover:cursor-pointer': controlledFields?.length > 1,
                              'hover:cursor-not-allowed': controlledFields?.length <= 1,
                            })}
                            color='rgb(32,44,56)'
                            onClick={() => {
                              if (controlledFields?.length < 1) return;
                              remove(index);
                            }}
                          />
                        </div>
                      );
                    })}
                    <div className='flex justify-end mt-2'>
                      <Button
                        onClick={() =>
                          append({
                            id: '',
                            quantity: '',
                          })
                        }
                        size={'md'}
                        type='button'>
                        Thêm phụ tùng
                      </Button>
                    </div>
                  </div>

                  <div className='col-span-2'>
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
                  </div>

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
                  {id && (
                    <FormField
                      control={form.control}
                      name='cancelled_description'
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Lý do hủy (nếu có)</FormLabel>
                          <FormControl>
                            <Textarea disabled placeholder='Nhập lý do' rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </form>
            </Form>
          </div>
          {id && <RenderFeeOfRepair repair={repair as RepairEntity} />}
        </div>
      </div>
      <div className='fixed left-0 right-0 bottom-0 flex items-center justify-end gap-4 px-6 py-3 border-t border-[#eee] bg-white'>
        <Button onClick={() => router.back()} variant='outline'>
          Hủy
        </Button>
        <Button form='repair-form' loading={creating || updating} type='submit'>
          Lưu
        </Button>
      </div>
    </Loading>
  );
};
