import React from 'react';

import { Badge } from '@/components/ui/badge';
import { RepairStatusEnum } from '@/src/graphql/type.interface';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';

type Props = {
  status?: RepairStatusEnum;
};

const configs = [
  {
    status: RepairStatusEnum.CANCELLED,
    bgColor: '#FEE2E2', // light red
    color: '#B91C1C', // dark red
  },
  {
    status: RepairStatusEnum.WAITING_FOR_CONFIRM,
    bgColor: '#FEF9C3', // light yellow
    color: '#92400E', // dark amber
  },
  {
    status: RepairStatusEnum.CONFIRMED,
    bgColor: '#E0F2FE', // light blue
    color: '#0369A1', // blue
  },
  {
    status: RepairStatusEnum.HANDLING,
    bgColor: '#DDD6FE', // light indigo
    color: '#5B21B6', // dark indigo
  },
  {
    status: RepairStatusEnum.WAITING_FOR_PAYMENT,
    bgColor: '#FEF3C7', // light amber
    color: '#92400E', // amber
  },
  {
    status: RepairStatusEnum.FINISHED,
    bgColor: '#DCFCE7', // light green
    color: '#15803D', // dark green
  },
];

export const RepairRequestStatus = ({ status }: Props) => {
  if (!status) return null;
  const config = configs.find((c) => c.status == status);

  if (!config)
    return (
      <Badge
        style={{
          backgroundColor: '#ccc',
          color: '#fff',
        }}
        variant='secondary'>
        {convertRepairStatusEnum(status)}
      </Badge>
    );

  return (
    <Badge
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
      variant='secondary'>
      {convertRepairStatusEnum(status)}
    </Badge>
  );
};

export default RepairRequestStatus;
