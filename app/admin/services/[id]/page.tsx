import { redirect } from 'next/navigation';
import React from 'react';
import { CreateServiceForm } from '@/app/admin/services/add/_components/create-service-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect('/login');
  }
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: 'Dịch vụ sữa chữa',
            href: AppRouter.admin.services.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <CreateServiceForm />
    </div>
  );
};

export default Page;
