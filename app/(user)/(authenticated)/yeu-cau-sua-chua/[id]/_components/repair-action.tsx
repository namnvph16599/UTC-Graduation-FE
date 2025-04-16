'use client';
import { useState } from 'react';
import { ModalCancelRepair } from '@/app/admin/repairs/add/_components/modal-cancel-repair';
import { Button } from '@/components/ui/button';
import { RepairEntity, RepairStatusEnum } from '@/src/graphql/type.interface';

type Props = {
  repair?: RepairEntity | null;
};

export const RepairAction = ({ repair }: Props) => {
  const [open, setOpen] = useState(false);

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
  return null;
};
