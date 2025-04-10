'use client';
import { useState } from 'react';
import { motorcycleColumns } from './_components/columns';
import { DataTable } from './_components/table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';
import { useRepairCollectionQuery } from '@/src/graphql/queries/repairCollection.generated';
import { PageMeta, RepairEntity } from '@/src/graphql/type.interface';

export const UserListRepairRequests = () => {
  const { user } = useAuth();

  const [page, setPage] = useState(1);

  const { data } = useRepairCollectionQuery({
    variables: {
      pagination: {
        limit: 10,
        page: page,
      },
      input: {
        userId: user?.id,
      },
    },
    skip: !user,
  });

  const repairs = data?.repairCollection.items ?? [];
  const pageMeta = data?.repairCollection.meta;

  return (
    <div className='container mx-auto'>
      <AppBreadcrumb
        className='px-0 mb-4'
        isAdmin={false}
        isUser={true}
        items={[
          {
            label: AppRouter.user.authenticatePages.repairRequest.label,
            href: '#',
          },
        ]}
      />
      <div className=''>
        <p className='font-semibold text-secondary-default mt-0 mb-5'>{pageMeta?.totalItem ?? 0} xe</p>
        <DataTable
          columns={motorcycleColumns}
          data={repairs as RepairEntity[]}
          onChangePage={setPage}
          pageMeta={pageMeta as PageMeta}
        />
      </div>
    </div>
  );
};
