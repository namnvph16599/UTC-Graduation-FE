'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppRouter, validationMessages } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';
import { useCreateMotorcycleMutation } from '@/src/graphql/mutations/createMotorcycle.generated';
import { useUpdateMotorcycleMutation } from '@/src/graphql/mutations/updateMotorcycle.generated';
import { useBrandCollectionQuery } from '@/src/graphql/queries/brandCollection.generated';
import { MotorcycleDocument, useMotorcycleQuery } from '@/src/graphql/queries/motorcycle.generated';
import { MotorcycleCollectionDocument } from '@/src/graphql/queries/motorcycleCollection.generated';
import { TDetailPageProps } from '@/src/types';

const formSchema = z.object({
  name: z
    .string({
      message: validationMessages.required,
    })
    .min(6, {
      message: validationMessages.minLength(6),
    }),
  brand_id: z.string({ message: validationMessages.required }).min(1, {
    message: validationMessages.required,
  }),
  model_id: z.string({ message: validationMessages.required }).min(1, {
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
});

export const MotorcycleForm = ({ id }: TDetailPageProps) => {
  const router = useRouter();

  const { user } = useAuth();

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
    defaultValues: {},
  });

  const currentBrandId = form.watch('brand_id');
  const currentModelId = form.watch('model_id');

  const modelOptions = useMemo(
    () =>
      (brands.find((b) => b.id === currentBrandId)?.models ?? []).map((m) => ({
        label: m.name,
        value: m.id,
      })),
    [brands, currentBrandId],
  );

  const { data, loading } = useMotorcycleQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
    onCompleted(data) {
      const defaultValues = data?.motorcycle;
      form.setValue('brand_id', defaultValues?.model?.brand?.id ?? '');
      form.setValue('model_id', defaultValues?.model?.id ?? '');
      form.setValue('name', defaultValues?.name ?? '');
      form.setValue('capacity', defaultValues?.capacity?.toString() ?? '');
      form.setValue('license_plate', defaultValues?.license_plate ?? '');
      form.setValue('manufacture_year', defaultValues?.manufacture_year ?? '');
    },
  });

  const motorcycle = useMemo(() => data?.motorcycle, [data?.motorcycle]);

  const [updateMutation, { loading: updating }] = useUpdateMotorcycleMutation({
    onCompleted() {
      toast.success('Cập nhật thành công!');
      router.push(AppRouter.user.authenticatePages.myVehicle.path);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [MotorcycleCollectionDocument, MotorcycleDocument],
  });

  const [createMutation, { loading: creating }] = useCreateMotorcycleMutation({
    onCompleted() {
      toast.success('Thêm mới thành công!');
      router.push(AppRouter.user.authenticatePages.myVehicle.path);
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [MotorcycleCollectionDocument, MotorcycleDocument],
  });

  const onSubmit = useCallback(
    async ({ brand_id: _, ...data }: z.infer<typeof formSchema>) => {
      const input = {
        ...data,
        capacity: Number(data?.capacity),
      };
      if (id) {
        return await updateMutation({
          variables: {
            input: { id, ...input },
          },
        });
      }
      return await createMutation({
        variables: {
          input: { user_id: user?.id ?? ' ', ...input },
        },
      });
    },
    [createMutation, id, updateMutation, user?.id],
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

    if (!currentModelId && currentBrandId && motorcycle?.model?.id) {
      const isExited = modelOptions.find((m) => m.value === motorcycle?.model?.id);
      if (isExited) {
        form.setValue('model_id', motorcycle?.model?.id);
      }
    }
  }, [currentBrandId, currentModelId, form, modelOptions, motorcycle?.model?.id]);

  return (
    <Loading loading={loading}>
      <div className='container mx-auto'>
        <AppBreadcrumb
          className='px-0 mb-4'
          isAdmin={false}
          isUser={true}
          items={[
            {
              label: AppRouter.user.authenticatePages.myVehicle.label,
              href: AppRouter.user.authenticatePages.myVehicle.path,
            },
            {
              label: id ? 'Chỉnh sửa' : 'Tạo mới',
              href: '#',
            },
          ]}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 items-start gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tên xe</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên xe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='license_plate'
                render={({ field }) => (
                  <FormItem>
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
                        removable={false}
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
                      <Input placeholder='Nhập dung tích' type='number' {...field} />
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
            </div>

            <div className='flex justify-end items-center gap-5 mt-10'>
              <Button className='px-10' onClick={() => router.back()} size={'md'} variant='outline'>
                Hủy
              </Button>
              <Button className='px-10' loading={updating || creating} size={'md'} type='submit'>
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Loading>
  );
};
