'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { staffColumns } from '@/app/admin/staffs/_components/columns';
import { DataTable } from '@/app/admin/staffs/_components/table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';
import { useUserCollectionByAdminQuery } from '@/src/graphql/queries/userCollectionByAdmin.generated';
import { PageMeta, UserEntity } from '@/src/graphql/type.interface';

export const ListStaffs = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data } = useUserCollectionByAdminQuery({
    variables: {
      paginationArgs: {
        limit: 10,
        page: page,
      },
    },
  });

  const services = data?.userCollectionByAdmin.items ?? [];
  const total = data?.userCollectionByAdmin.meta?.totalItem ?? 0;

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.staff.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.staff.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{total} nhân viên</p>
          <DataTable
            columns={staffColumns}
            data={services as UserEntity[]}
            onChangePage={setPage}
            pageMeta={data?.userCollectionByAdmin?.meta as PageMeta}
          />
        </div>
      </div>
    </div>
  );
};
