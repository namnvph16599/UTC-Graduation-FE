import { CreateServiceForm } from '@/app/admin/services/add/_components/create-service-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

export const CreateService = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: 'Dịch vụ sữa chữa',
            href: AppRouter.admin.services.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <CreateServiceForm />
    </div>
  );
};
