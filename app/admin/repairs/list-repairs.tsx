'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  cancelledStatusColumns,
  finishedStatusColumns,
  Payment,
  waitingStatusColumns,
} from '@/app/admin/repairs/_components/columns';
import { DataTable } from '@/app/admin/repairs/_components/repairs-table';
import { RepairsTabs } from '@/app/admin/repairs/_components/repairs-tabs';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';
import { RepairStatusEnum } from '@/lib/enum';

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

export const ListRepairs = () => {
  const router = useRouter();
  const [tab, setTab] = useState(RepairStatusEnum.WAITING_FOR_CONFIRM);

  const data = getData();

  const getColumnsByActiveTab = useCallback(() => {
    switch (tab) {
      case RepairStatusEnum.CANCELLED:
        return cancelledStatusColumns;
      case RepairStatusEnum.FINISHED:
        return finishedStatusColumns;

      default:
        return waitingStatusColumns;
    }
  }, [tab]);

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
      <RepairsTabs activeTab={tab} onChangeTab={setTab} />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>10 yêu cầu</p>
          <DataTable columns={getColumnsByActiveTab()} data={data} tab={tab} />
        </div>
      </div>
    </div>
  );
};
