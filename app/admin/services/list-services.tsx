'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { serviceColumns } from '@/app/admin/services/_components/columns';
import { DataTable } from '@/app/admin/services/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';
import { useServicesQuery } from '@/src/graphql/queries/services.generated';
import { ServicesEntity } from '@/src/graphql/type.interface';

export const ListServices = () => {
  const router = useRouter();

  const { data } = useServicesQuery({
    variables: {},
  });

  const services = data?.services ?? [];

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Dịch vụ sửa chữa',
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.services.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>10 dịch vụ</p>
          <DataTable columns={serviceColumns} data={services as ServicesEntity[]} />
        </div>
      </div>
    </div>
  );
};
