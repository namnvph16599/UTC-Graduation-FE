import React from 'react';
import { RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { Badge } from '@/components/ui/badge';
import { convertRepairCalcelEnum } from '@/src/utils/convert-enum.util';

type Props = {
  repair?: RepairEntity;
};

export const RepairNotification = ({ repair }: Props) => {
  return (
    <div>
      {repair?.status === RepairStatusEnum.CANCELLED && (
        <Badge className='w-full rounded py-2' variant={'error'}>
          <div>
            {convertRepairCalcelEnum(repair?.cancelBy)}
            <br />
            Lý do: {repair?.cancelled_description}
          </div>
        </Badge>
      )}
      {repair?.status === RepairStatusEnum.WAITING_FOR_CONFIRM && (
        <Badge className='w-full rounded py-2' variant={'warning'}>
          Yêu cầu sữa chữa đã được gửi đi. Vui lòng đợi xác nhận
        </Badge>
      )}
      {repair?.status === RepairStatusEnum.CONFIRMED && (
        <Badge className='w-full rounded py-2' variant={'warning'}>
          Yêu cầu sữa chữa đã được xác nhận. Hãy giao xe đến để chúng tôi sửa chữa cho bạn
        </Badge>
      )}
      {repair?.status === RepairStatusEnum.HANDLING && (
        <Badge className='w-full rounded py-2' variant={'warning'}>
          Xe của bạn đang được sửa chữa.
        </Badge>
      )}
      {repair?.status === RepairStatusEnum.WAITING_FOR_PAYMENT && (
        <Badge className='w-full rounded py-2' variant={'success'}>
          Yêu cầu sữa chữa đã hoàn thành. Bạn hãy đến thanh toán để nhận xe
        </Badge>
      )}
      {repair?.status === RepairStatusEnum.FINISHED && (
        <Badge className='w-full rounded py-2' variant={'success'}>
          Yêu cầu sửa chữa đã hoàn thành. Cảm ơn đã ủng hộ chúng tôi
        </Badge>
      )}
    </div>
  );
};
