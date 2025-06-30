import React from 'react';
import { cn } from '@/src/constants/utils';
import { RepairStatusEnum } from '@/src/graphql/type.interface';

const tabs = [
  {
    label: 'Chờ nhận',
    value: RepairStatusEnum.WAITING_FOR_CONFIRM,
  },
  {
    label: 'Đã xác nhận',
    value: RepairStatusEnum.CONFIRMED,
  },
  {
    label: 'Đang xử lý',
    value: RepairStatusEnum.HANDLING,
  },
  {
    label: 'Chờ thanh toán',
    value: RepairStatusEnum.WAITING_FOR_PAYMENT,
  },
  {
    label: 'Hoàn thành',
    value: RepairStatusEnum.FINISHED,
  },
  {
    label: 'Đã hủy',
    value: RepairStatusEnum.CANCELLED,
  },
];

type Props = {
  activeTab: RepairStatusEnum;
  onChangeTab: (newTab: RepairStatusEnum) => void;
};

export const RepairsTabs = ({ activeTab, onChangeTab }: Props) => {
  return (
    <div className='flex items-center bg-white pl-6'>
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        return (
          <div
            className={cn('px-6 py-3 text-base', {
              'font-semibold text-[#F5B102] border-b border-[#F5B102]': isActive,
              'text-[#202C38]hover:text-[#F5B102] hover:cursor-pointer': !isActive,
            })}
            key={tab.value}
            onClick={() => onChangeTab(tab.value)}>
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};
