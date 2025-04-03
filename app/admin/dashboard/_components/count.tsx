'use client';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { cn } from '@/src/constants/utils';
import { useCountRepairsByStatusesQuery } from '@/src/graphql/queries/countRepairsByStatuses.generated';
import { RepairStatusEnum } from '@/src/graphql/type.interface';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';
import { Title } from './title';

export const Count = () => {
  const { data, loading } = useCountRepairsByStatusesQuery({});

  const count = useMemo(() => data?.countRepairsByStatuses ?? [], [data?.countRepairsByStatuses]);

  const getAmountByStatus = useCallback(
    (status: RepairStatusEnum) => count?.find((i) => i.status === status)?.total ?? 0,
    [count],
  );

  const items = [
    {
      label: RepairStatusEnum.WAITING_FOR_CONFIRM,
      value: getAmountByStatus(RepairStatusEnum.WAITING_FOR_CONFIRM),
    },
    {
      label: RepairStatusEnum.CONFIRMED,
      value: getAmountByStatus(RepairStatusEnum.CONFIRMED),
    },
    {
      label: RepairStatusEnum.HANDLING,
      value: getAmountByStatus(RepairStatusEnum.HANDLING),
    },
    {
      label: RepairStatusEnum.WAITING_FOR_PAYMENT,
      value: getAmountByStatus(RepairStatusEnum.WAITING_FOR_PAYMENT),
    },
    {
      label: RepairStatusEnum.FINISHED,
      value: getAmountByStatus(RepairStatusEnum.FINISHED),
    },
    {
      label: RepairStatusEnum.CANCELLED,
      value: getAmountByStatus(RepairStatusEnum.CANCELLED),
    },
  ];

  return (
    <div className='bg-white p-5 rounded'>
      <Title title='Yêu cầu sửa chữa' />
      <div className='grid grid-cols-6'>
        {items.map((it, idx) => (
          <div
            className={cn('text-center py-2', {
              'border-r border-[#eee]': idx < 5,
            })}
            key={it.label}>
            <p className='text-black-1A font-semibold text-xl flex justify-center'>
              {loading ? <Loader2 className='animate-spin' /> : it.value.toString()}
            </p>
            <p className='text-black-2A'>{convertRepairStatusEnum(it.label)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
