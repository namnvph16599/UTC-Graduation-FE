import { redirect } from 'next/navigation';
import { CreateServiceForm } from '@/app/admin/services/add/_components/create-service-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect(AppRouter.admin.dashboard);
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
      <CreateServiceForm id={id} />
    </div>
  );
};

export default Page;
