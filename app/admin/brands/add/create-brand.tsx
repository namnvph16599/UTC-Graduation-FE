import { BrandForm } from '@/app/admin/brands/_components/brand-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

export const CreateBrand = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.brands.label,
            href: AppRouter.admin.brands.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <BrandForm />
    </div>
  );
};
