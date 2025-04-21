'use client';
import { useMemo, useState } from 'react';
import { RepairForm } from './repair-form';
import { RepairReview } from './repair-review';
import { ModalCancelRepair } from '@/app/admin/repairs/add/_components/modal-cancel-repair';
import { RepairInvoice } from '@/app/admin/repairs/add/_components/repair-invoice';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppRouter } from '@/src/constants/constant';
import { useRepairQuery } from '@/src/graphql/queries/repair.generated';
import { RepairCancelEnum, RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { TDetailPageProps } from '@/src/types';

export const DetailRepair = ({ id }: TDetailPageProps) => {
  const { data, loading } = useRepairQuery({
    variables: {
      id: id as string,
    },
    skip: !id,
  });

  const repair = useMemo(() => data?.repair, [data?.repair]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  return (
    <Loading loading={loading}>
      <AppBreadcrumb
        items={[
          {
            label: 'Yêu cầu sữa chữa',
            href: AppRouter.admin.repairs.list,
          },
          {
            label: id ? 'Chỉnh sửa' : 'Thêm mới',
            href: '#',
          },
        ]}
        rightContent={
          !!repair?.status &&
          [RepairStatusEnum.WAITING_FOR_CONFIRM, RepairStatusEnum.CONFIRMED].includes(repair?.status) && (
            <Button onClick={() => setOpenModalCancel(true)} size={'md'} variant={'redOutline'}>
              Từ chối
            </Button>
          )
        }
      />
      {openModalCancel && repair?.id && (
        <ModalCancelRepair id={repair?.id} open={openModalCancel} setOpen={setOpenModalCancel} />
      )}

      {!id ? (
        <RepairForm repair={repair as RepairEntity} />
      ) : (
        <Tabs className='w-full p-o pt-3' defaultValue='account'>
          <TabsList className='pl-5'>
            <TabsTrigger className='text-base' value='account'>
              Thông tin
            </TabsTrigger>
            <TabsTrigger className='text-base' value='password'>
              Hóa đơn
            </TabsTrigger>
            <TabsTrigger className='text-base' value='review'>
              Đánh giá
            </TabsTrigger>
          </TabsList>
          {repair?.cancelBy === RepairCancelEnum.USER && (
            <Badge className='w-full rounded-none py-2' variant={'warning'}>
              Yêu cầu sửa chữa đã bị hủy bởi khách hàng
            </Badge>
          )}
          <TabsContent value='account'>
            <RepairForm repair={repair as RepairEntity} />
          </TabsContent>
          <TabsContent value='password'>
            <RepairInvoice repair={repair as RepairEntity} />
          </TabsContent>
          <TabsContent value='review'>
            <RepairReview repair={repair as RepairEntity} />
          </TabsContent>
        </Tabs>
      )}
    </Loading>
  );
};
