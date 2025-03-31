import { CreateRepairForm } from '@/app/admin/repairs/add/_components/repair-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

export const CreateRepair = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: 'Yêu cầu sữa chữa',
            href: AppRouter.admin.repairs.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <CreateRepairForm />
    </div>
  );
};
