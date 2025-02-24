import { BannerForm } from '@/app/admin/banners/_components/banner-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

export const CreateBanner = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.banners.label,
            href: AppRouter.admin.banners.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <BannerForm />
    </div>
  );
};
