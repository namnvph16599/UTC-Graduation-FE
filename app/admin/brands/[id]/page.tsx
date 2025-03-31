import { redirect } from 'next/navigation';
import { BrandForm } from '@/app/admin/brands/_components/brand-form';
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
            label: AppRouter.admin.brands.label,
            href: AppRouter.admin.brands.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <BrandForm id={id as string} />
    </div>
  );
};

export default Page;
