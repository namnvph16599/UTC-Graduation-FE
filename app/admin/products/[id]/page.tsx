import { redirect } from 'next/navigation';
import { CreateProductForm } from '@/app/admin/products/add/_components/create-product-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

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
            label: 'Phụ tùng thay thế',
            href: AppRouter.admin.services.list,
          },
          {
            label: 'Chỉnh sửa',
            href: '#',
          },
        ]}
      />
      <CreateProductForm />
    </div>
  );
};

export default Page;
