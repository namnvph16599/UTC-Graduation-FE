'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { validationMessages } from '@/src/constants/constant';
import { REGEX } from '@/src/constants/regex';
import { useCreateUserByAdminMutation } from '@/src/graphql/mutations/createUserByAdmin.generated';
import { useUpdateUserByAdminMutation } from '@/src/graphql/mutations/updateUserByAdmin.generated';
import { useGetStaffByAdminQuery } from '@/src/graphql/queries/getStaffByAdmin.generated';
import { UserCollectionByAdminDocument } from '@/src/graphql/queries/userCollectionByAdmin.generated';
import { UserStatus } from '@/src/graphql/type.interface';
import { convertUserStatus } from '@/src/utils/convert-enum.util';

const formSchema = z.object({
  fullName: z.string({
    message: validationMessages.required,
  }),
  phoneNumber: z
    .string({
      message: validationMessages.required,
    })
    .regex(REGEX.phone, validationMessages.invalidPhone),
  password: z.string().optional(),
  email: z
    .string()
    .email({
      message: validationMessages.invalidEmail,
    })
    .optional(),
  status: z.enum(Object.values(UserStatus) as [string, ...string[]]),
});

export const StaffForm = ({ id }: { id?: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: 'nvnam042',
      status: UserStatus.ACTIVE,
    },
  });

  const { loading } = useGetStaffByAdminQuery({
    variables: {
      staffId: id ?? '',
    },
    skip: !id,
    onCompleted(data) {
      const values = data?.getStaffByAdmin;
      form.setValue('email', values?.email ?? '');
      form.setValue('fullName', values?.fullName ?? '');
      form.setValue('phoneNumber', values?.phoneNumber ?? '');
      form.setValue('status', values?.status ?? '');
    },
  });

  const [updateServiceMutation, { loading: updating }] = useUpdateUserByAdminMutation({
    onCompleted() {
      toast.error('Cập nhật thành công!');
      router.back();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [UserCollectionByAdminDocument],
  });

  const [creatingServiceMutation, { loading: creating }] = useCreateUserByAdminMutation({
    onCompleted() {
      toast.error('Thêm mới thành công!');
      router.back();
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [UserCollectionByAdminDocument],
  });

  const onSubmit = useCallback(
    async (input: z.infer<typeof formSchema>) => {
      const data = {
        ...input,
        phonePrefix: '',
        status: input.status as UserStatus,
        password: (!id ? input.password : '') as string,
      };
      if (id) {
        return await updateServiceMutation({
          variables: {
            input: {
              id: id,
              ...data,
            },
          },
        });
      }

      return await creatingServiceMutation({
        variables: {
          input: data,
        },
      });
    },
    [creatingServiceMutation, id, updateServiceMutation],
  );

  return (
    <Loading loading={loading}>
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white mb-[93px] max-w-[600px] mx-auto'>
          <Form {...form}>
            <form
              className='grid grid-cols-1 items-start gap-6'
              id='repair-form'
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Tên nhân viên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên nhân viên' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập số điện thoại' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!id && (
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập mật khẩu' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <FormControl>
                      <Combobox
                        className='block'
                        {...field}
                        onChange={(val) => field.onChange(val)}
                        options={Object.values(UserStatus).map((v) => ({
                          label: convertUserStatus(v),
                          value: v,
                        }))}
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
        <Button disabled={updating || creating} form='repair-form'>
          {id ? 'Lưu' : 'Thêm mới'}
        </Button>
      </div>
    </Loading>
  );
};
