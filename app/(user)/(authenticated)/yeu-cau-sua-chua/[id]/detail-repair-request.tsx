'use client';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { RenderFeeOfRepair } from '@/app/admin/repairs/add/_components/render-fee-of-repair';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { AppRouter, DATE_FORMAT } from '@/src/constants/constant';
import { useRepairQuery } from '@/src/graphql/queries/repair.generated';
import { RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { TDetailPageProps } from '@/src/types';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';

export const DetailRepairRequest = ({ id }: TDetailPageProps) => {
  const { data, loading } = useRepairQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
  });

  const repair = useMemo(() => data?.repair, [data?.repair]);

  const rows = useMemo(
    () => [
      { label: 'Trạng thái', value: convertRepairStatusEnum(repair?.status as RepairStatusEnum) },
      { label: 'Hãng xe', value: repair?.model?.brand?.name },
      { label: 'Dòng xe', value: repair?.model?.name },
      { label: 'Dung tích', value: repair?.capacity },
      { label: 'Năm sản xuất', value: repair?.manufacture_year },
      { label: 'Biển số xe', value: repair?.license_plate },
      {
        label: 'Thời gian dự kiến giao xe',
        value: repair?.estimated_delivery_time
          ? dayjs(repair?.estimated_delivery_time).format(DATE_FORMAT.dateTime)
          : null,
      },
      {
        label: 'Thời gian dự kiến nhận xe',
        value: repair?.expected_receiving_time
          ? dayjs(repair?.expected_receiving_time).format(DATE_FORMAT.dateTime)
          : null,
      },
      { label: 'Dịch vụ sửa chữa', value: repair?.services?.map((s) => s.service.name).join(', ') },
      { label: 'Phụ tùng thay thế', value: repair?.products?.map((s) => s.product.name).join(', ') },
      { label: 'Ghi chú', value: repair?.description_of_customer },
      { label: 'Nhân viên phụ trách', value: repair?.staff?.fullName },
      { label: 'SĐT của nhân viên phụ trách', value: repair?.staff?.phoneNumber },
    ],
    [repair],
  );

  return (
    <Loading loading={loading}>
      <div className='container mx-auto'>
        <AppBreadcrumb
          className='px-0 mb-4'
          isAdmin={false}
          isUser={true}
          items={[
            {
              label: AppRouter.user.authenticatePages.repairRequest.label,
              href: AppRouter.user.authenticatePages.repairRequest.path,
            },
            {
              label: 'Xem chi tiết',
              href: '#',
            },
          ]}
        />
        <div className='grid grid-cols-7 gap-8 text-secondary-default'>
          <div className='col-span-5 py-5'>
            <h1 className='text-xl font-bold mb-5'>Thông tin</h1>
            <div className='grid grid-cols-5'>
              {rows.map((r) => {
                return (
                  <>
                    <div className='col-span-1 border border-[#eee] px-4 py-2 bg-[#F9F9F9]'>{r.label}</div>
                    <div className='col-span-4 border border-[#eee] px-4 py-2  font-medium'>{r?.value ?? '--'}</div>
                  </>
                );
              })}
            </div>
          </div>
          <RenderFeeOfRepair className='text-secondary-default' repair={repair as RepairEntity} />
        </div>
      </div>
    </Loading>
  );
};
