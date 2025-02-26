'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BannerEntity, serviceColumns } from '@/app/admin/banners/_components/columns';
import { DataTable } from '@/app/admin/banners/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';

function getData(): BannerEntity[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      name: 'Dịch vụ 1',
      priority_number: 10,
      active: true,
      image: 'https://picsum.photos/200/200',
    },
    {
      id: '728ed52f2',
      name: 'Dịch vụ 2',
      priority_number: 10,
      active: false,
      image: 'https://picsum.photos/200/200',
    },
    // ...
  ];
}

export const ListBanners = () => {
  const router = useRouter();

  const data = getData();

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.banners.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.banners.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>10 banners</p>
          <DataTable columns={serviceColumns} data={data} />
        </div>
      </div>
    </div>
  );
};
