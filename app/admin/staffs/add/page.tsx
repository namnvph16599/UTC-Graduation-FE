import { StaffForm } from '@/app/admin/staffs/_components/staff-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

const Page = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.staff.label,
            href: AppRouter.admin.services.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <StaffForm />
    </div>
  );
};

export default Page;
