'use client';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';
import { UserType } from '@/src/graphql/type.interface';

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { isLoading, isLoggedIn, user } = useAuth();

  if (isLoading) return <Loading className='w-full' loading={true} />;
  if (!isLoggedIn) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Không có quyền truy cập</h1>
          <p className='text-gray-600 mb-6'>Bạn phải đăng nhập để vào trang này</p>
          <Button className='w-full' onClick={() => router.push(AppRouter.auth.login)}>
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }
  if (user?.type != UserType.ADMIN) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Không có quyền truy cập</h1>
          <p className='text-gray-600 mb-6'>Chỉ quản trị viên mới có quyền truy cập vào trang này</p>
          <Button className='w-full' onClick={() => router.push(AppRouter.user.home)}>
            Trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminLayout;
