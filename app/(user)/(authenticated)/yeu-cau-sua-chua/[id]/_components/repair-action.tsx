'use client';
import { useState } from 'react';
import { ModalConfirmRestoreRepairRequest } from '@/app/(user)/(authenticated)/yeu-cau-sua-chua/[id]/_components/modal-confirm-restore-repair-request';
import { ModalCancelRepair } from '@/app/admin/repairs/add/_components/modal-cancel-repair';
import { Button } from '@/components/ui/button';
import { RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';
import { ModalReviewRepairRequest } from './modal-review-repair-request';

type Props = {
  repair?: RepairEntity | null;
};

export const RepairAction = ({ repair }: Props) => {
  const [open, setOpen] = useState(false);
  const [openModalReview, setOpenModalReview] = useState(false);
  const [openModalRestore, setOpenModalRestore] = useState(false);

  if (repair?.status === RepairStatusEnum.WAITING_FOR_CONFIRM || repair?.status === RepairStatusEnum.CONFIRMED) {
    return (
      <>
        <Button className='text-primary-default' onClick={() => setOpen(true)} variant={'outline'}>
          Hủy yêu cầu
        </Button>
        <ModalCancelRepair id={repair?.id} isUserCancel open={open} setOpen={setOpen} />
      </>
    );
  }
  if (repair?.status === RepairStatusEnum.FINISHED && !repair?.review) {
    return (
      <>
        <Button onClick={() => setOpenModalReview(true)}>Đánh giá</Button>
        <ModalReviewRepairRequest id={repair?.id} open={openModalReview} setOpen={setOpenModalReview} />
      </>
    );
  }
  if (repair?.status === RepairStatusEnum.CANCELLED) {
    return (
      <>
        <Button onClick={() => setOpenModalRestore(true)}>Đặt lại YCSC</Button>
        <ModalConfirmRestoreRepairRequest id={repair?.id} open={openModalRestore} setOpen={setOpenModalRestore} />
      </>
    );
  }
  return null;
};
