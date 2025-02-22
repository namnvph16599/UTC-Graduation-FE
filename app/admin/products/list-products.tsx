'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { serviceColumns, ProductEntity } from '@/app/admin/products/_components/columns';
import { DataTable } from '@/app/admin/products/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';

function getData(): ProductEntity[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      name: 'Dịch vụ 1',
      price: 100000,
      quantity: 100,
    },
    // ...
  ];
}

export const ListProducts = () => {
  const router = useRouter();

  const data = getData();

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Phụ tùng thay thế',
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.products.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>10 phụ tùng</p>
          <DataTable columns={serviceColumns} data={data} />
        </div>
      </div>
    </div>
  );
};
