import { redirect } from 'next/navigation';
import { BannerForm } from '@/app/admin/banners/_components/banner-form';
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
            label: AppRouter.admin.banners.label,
            href: AppRouter.admin.banners.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <BannerForm id={id} />
    </div>
  );
};

export default Page;
