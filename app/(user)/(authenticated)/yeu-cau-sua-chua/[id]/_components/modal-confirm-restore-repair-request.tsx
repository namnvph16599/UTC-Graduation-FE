'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ErrorMessage } from '@/src/constants/error';
import { ProductCollectionDocument } from '@/src/graphql/queries/productCollection.generated';
import { RepairDocument } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';
import { useUserRestoreRepairRequestMutation } from '@/src/graphql/mutations/userRestoreRepairRequest.generated';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
};

export const ModalConfirmRestoreRepairRequest = ({ open, setOpen, id }: Props) => {
  const router = useRouter();

  const [userRestoreRepairRequestMutation, { loading }] = useUserRestoreRepairRequestMutation({
    onCompleted() {
      toast.success('Đặt lại YCSC thành công!');
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      toast.error(ErrorMessage.default, {
        description: error.message,
      });
    },
    refetchQueries: [RepairDocument, RepairCollectionDocument, ProductCollectionDocument],
  });

  const onSubmit = useCallback(async () => {
    await userRestoreRepairRequestMutation({
      variables: {
        id: id,
      },
    });
  }, [userRestoreRepairRequestMutation, id]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className='w-[625px]'>
        <DialogHeader>
          <DialogTitle>{'Bạn có chắc chắn muốn đặt lại YCSC'}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button loading={loading} onClick={() => setOpen(false)} variant={'outline'}>
            Hủy
          </Button>
          <Button loading={loading} onClick={onSubmit} type='submit'>
            Đặt lại
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
