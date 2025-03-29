import { redirect } from 'next/navigation';
import React from 'react';
import { CreateRepairForm } from '@/app/admin/repairs/add/_components/repair-form';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect('/login');
  }
  return <CreateRepairForm id={id} />;
};

export default Page;
