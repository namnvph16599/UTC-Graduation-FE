import React, { useMemo } from 'react';
import { formatVND } from '@/src/constants/utils';
import { RepairEntity } from '@/src/graphql/type.interface';

type Props = {
  repair?: RepairEntity;
};

export const RenderFeeOfRepair = ({ repair }: Props) => {
  const product = useMemo(
    () => (repair?.products ?? []).reduce((sum, p) => (sum += p.price * p.quantity), 0) ?? 0,
    [repair?.products],
  );

  const service = useMemo(
    () => (repair?.services ?? []).reduce((sum, s) => (sum += s.price), 0) ?? 0,
    [repair?.services],
  );

  const discount = useMemo(
    () => ((product + service) * (repair?.discount_percent ?? 0)) / 100,
    [product, repair?.discount_percent, service],
  );

  return (
    <div className='col-span-2 p-5 bg-white mb-[93px] text-[#202C38]'>
      <h1 className='text-xl font-bold mb-5'>Chi phí</h1>
      <div className='grid grid-cols-2'>
        <div className='border border-[#eee] px-4 py-2 bg-[#F9F9F9]'>Phụ tùng</div>
        <div className='border border-[#eee] px-4 py-2'>{formatVND(product, true)}</div>
        <div className='border border-[#eee] px-4 py-2 bg-[#F9F9F9]'>Dịch vụ</div>
        <div className='border border-[#eee] px-4 py-2'>{formatVND(service, true)}</div>
        <div className='border border-[#eee] px-4 py-2 bg-[#F9F9F9]'>Thuế</div>
        <div className='border border-[#eee] px-4 py-2'>10%</div>
        <div className='border border-[#eee] px-4 py-2 bg-[#F9F9F9]'>Giảm giá</div>
        <div className='border border-[#eee] px-4 py-2'>-{formatVND(discount ?? 0, true)}</div>
        <div className='border border-[#eee] px-4 py-2 bg-[#eee]'>Tổng tiền</div>
        <div className='border border-[#eee] px-4 py-2'>{formatVND(repair?.total ?? 0, true)}</div>
      </div>
    </div>
  );
};
