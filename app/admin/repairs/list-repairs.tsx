'use client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
      <div className='px-6 py-4 flex items-center justify-between'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={AppRouter.admin.dashboard}>Tổng quan</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#'>Yêu cầu sửa chữa</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          onClick={() => {
            router.push(AppRouter.admin.repairs.add);
          }}
          size={'md'}>
          Thêm <Plus />
        </Button>
      </div>
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
