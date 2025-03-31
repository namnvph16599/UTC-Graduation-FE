import { redirect } from 'next/navigation';
import { StaffForm } from '@/app/admin/staffs/_components/staff-form';
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
            label: AppRouter.admin.staff.label,
            href: AppRouter.admin.staff.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <StaffForm id={id} />
    </div>
  );
};

export default Page;
