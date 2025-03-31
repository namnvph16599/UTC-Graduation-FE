'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import {
  cancelledStatusColumns,
  finishedStatusColumns,
  waitingStatusColumns,
} from '@/app/admin/repairs/_components/columns';
import { DataTable } from '@/app/admin/repairs/_components/repairs-table';
import { RepairsTabs } from '@/app/admin/repairs/_components/repairs-tabs';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useRepairCollectionQuery } from '@/src/graphql/queries/repairCollection.generated';
import { PageMeta, RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';

export const ListRepairs = () => {
  const router = useRouter();
  const [tab, setTab] = useState(RepairStatusEnum.WAITING_FOR_CONFIRM);

  const getColumnsByActiveTab = useCallback(() => {
    switch (tab) {
      case RepairStatusEnum.WAITING_FOR_CONFIRM:
      case RepairStatusEnum.CONFIRMED:
      case RepairStatusEnum.HANDLING:
        return waitingStatusColumns;
      case RepairStatusEnum.FINISHED:
      case RepairStatusEnum.WAITING_FOR_PAYMENT:
        return finishedStatusColumns;
      case RepairStatusEnum.CANCELLED:
        return cancelledStatusColumns;

      default:
        return [];
    }
  }, [tab]);

  const [page, setPage] = useState(1);

  const { data } = useRepairCollectionQuery({
    variables: {
      input: {
        status: tab,
      },
      pagination: {
        page: page,
        limit: 10,
      },
    },
  });

  const repairs = useMemo(() => data?.repairCollection?.items ?? [], [data?.repairCollection?.items]);
  const pageMeta = useMemo(() => data?.repairCollection?.meta, [data?.repairCollection?.meta]);

  const renderTableByTab = useCallback(
    () => (
      <DataTable
        columns={getColumnsByActiveTab()}
        data={repairs as RepairEntity[]}
        onChangePage={setPage}
        pageMeta={pageMeta as PageMeta}
        tab={tab}
      />
    ),
    [getColumnsByActiveTab, pageMeta, repairs, tab],
  );

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Yêu cầu sữa chữa',
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.repairs.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <RepairsTabs
        activeTab={tab}
        onChangeTab={(newTab) => {
          setTab(newTab);
          setPage(1);
        }}
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem ?? 0} yêu cầu</p>
          {renderTableByTab()}
        </div>
      </div>
    </div>
  );
};
