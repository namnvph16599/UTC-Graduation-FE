import { redirect } from 'next/navigation';
import React from 'react';
import { CreateRepairForm } from '@/app/admin/repairs/add/_components/repair-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect('/login');
  }
  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Yêu cầu sữa chữa',
            href: AppRouter.admin.repairs.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <CreateRepairForm id={id} />;
    </div>
  );
};

export default Page;
