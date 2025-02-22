import { CreateProductForm } from '@/app/admin/products/add/_components/create-product-form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

export const CreateProductPage = () => {
  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: 'Phụ tùng thay thế',
            href: AppRouter.admin.products.list,
          },
          {
            label: 'Thêm mới',
            href: '#',
          },
        ]}
      />
      <CreateProductForm />
    </div>
  );
};
