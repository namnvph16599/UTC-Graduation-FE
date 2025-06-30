'use client';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { repairColumns } from '@/app/admin/repairs/_components/columns';
import { DataTable } from '@/app/admin/repairs/_components/repairs-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useRepairCollectionQuery } from '@/src/graphql/queries/repairCollection.generated';
import { PageMeta, RepairCollectionFilter, RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { filterRepairSchema, RepairFormFilter } from './_components/repair-form-filter';
import { RepairsTabs } from './_components/repairs-tabs';

export const ListRepairs = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [args, setArgs] = useState<RepairCollectionFilter | null>();
  const [search, setSearch] = useState<string | null>(null);

  const [tab, setTab] = useState(RepairStatusEnum.WAITING_FOR_CONFIRM);

  const { data, loading } = useRepairCollectionQuery({
    variables: {
      input: {
        status: tab,
        startDate: args?.startDate ? dayjs(args.startDate).startOf('date').toISOString() : null,
        endDate: args?.endDate ? dayjs(args.endDate).endOf('date').toISOString() : null,
      },
      pagination: {
        page: page,
        limit: 10,
        search: search,
      },
    },
  });

  const repairs = useMemo(() => data?.repairCollection?.items ?? [], [data?.repairCollection?.items]);
  const pageMeta = useMemo(() => data?.repairCollection?.meta, [data?.repairCollection?.meta]);

  const handleFilter = useCallback((values: z.infer<typeof filterRepairSchema>) => {
    setArgs({
      startDate: values?.createdAt?.from,
      endDate: values?.createdAt?.to,
    });
    setSearch(values?.search ?? '');
    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback(() => {
    setArgs(null);
    setSearch('');
    setPage(1);
  }, []);

  return (
    <Loading loading={loading}>
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
        <RepairFormFilter onFilter={handleFilter} onRemoveFilter={handleRemoveFilter} />

        <div className='mt-5 p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem ?? 0} yêu cầu</p>
          <DataTable
            columns={repairColumns}
            data={repairs as RepairEntity[]}
            onChangePage={setPage}
            pageMeta={pageMeta as PageMeta}
          />
        </div>
      </div>
    </Loading>
  );
};
