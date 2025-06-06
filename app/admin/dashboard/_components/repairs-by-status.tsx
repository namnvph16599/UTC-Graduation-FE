'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { Loading } from '@/components/app-loading';
import { AppRouter } from '@/src/constants/constant';
import { useRepairCollectionQuery } from '@/src/graphql/queries/repairCollection.generated';
import { PageMeta, RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { Title } from './title';
import { waitingStatusColumns } from '../../repairs/_components/columns';
import { DataTable } from '../../repairs/_components/repairs-table';

interface Props {
  status: RepairStatusEnum;
  title: string;
}

export const RepairsByStatus = ({ status, title }: Props) => {
  const { data, loading } = useRepairCollectionQuery({
    variables: {
      input: {
        status,
      },
      pagination: {
        page: 1,
        limit: 10,
      },
    },
  });

  const repairs = useMemo(() => data?.repairCollection?.items ?? [], [data?.repairCollection?.items]);
  const pageMeta = useMemo(() => data?.repairCollection?.meta ?? [], [data?.repairCollection?.meta]);

  return (
    <div className='bg-white p-6 rounded'>
      <div className='flex items-center justify-between'>
        <Title title={title} />
        <Link
          className='text-primary-default text-sm underline flex items-center gap-x'
          href={AppRouter.admin.repairs.list}>
          Xem tất cả <ChevronRight height={18} width={18} />
        </Link>
      </div>

      <Loading loading={loading}>
        <DataTable
          columns={waitingStatusColumns}
          data={repairs as RepairEntity[]}
          hiddenPagination={true}
          onChangePage={(_newPage) => {}}
          pageMeta={pageMeta as PageMeta}
          tab={status}
        />
      </Loading>
    </div>
  );
};
