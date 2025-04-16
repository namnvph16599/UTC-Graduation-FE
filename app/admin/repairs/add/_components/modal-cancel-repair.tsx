'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { validationMessages } from '@/src/constants/constant';
import { ErrorMessage } from '@/src/constants/error';
import { useCancelRepairMutation } from '@/src/graphql/mutations/cancelRepair.generated';
import { useUserCancelRepairMutation } from '@/src/graphql/mutations/userCancelRepair.generated';
import { ProductCollectionDocument } from '@/src/graphql/queries/productCollection.generated';
import { RepairDocument } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';

const schema = z.object({
  cancelled_description: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
});

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  isUserCancel?: boolean;
};

export const ModalCancelRepair = ({ open, setOpen, id, isUserCancel = false }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const [adminCancelRepairRequest, { loading }] = useCancelRepairMutation({
    onCompleted() {
      toast.success('Từ chối yêu cầu sửa chữa thành công!');
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      toast.error(ErrorMessage.default, {
        description: error.message,
      });
    },
    refetchQueries: [RepairCollectionDocument, RepairDocument, ProductCollectionDocument],
  });

  const [userCancelRepairRequest, { loading: cancelling }] = useUserCancelRepairMutation({
    onCompleted() {
      toast.success('Hủy yêu cầu sửa chữa thành công!');
      setOpen(false);
      router.refresh();
    },
    onError(error) {
      toast.error(ErrorMessage.default, {
        description: error.message,
      });
    },
    refetchQueries: [RepairCollectionDocument, RepairDocument, ProductCollectionDocument],
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      if (isUserCancel) {
        await userCancelRepairRequest({
          variables: {
            input: {
              cancelled_description: data.cancelled_description,
              id: id,
            },
          },
        });
      } else {
        await adminCancelRepairRequest({
          variables: {
            input: {
              cancelled_description: data.cancelled_description,
              id: id,
            },
          },
        });
      }
    },
    [adminCancelRepairRequest, id, isUserCancel, userCancelRepairRequest],
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className='w-[625px]'>
        <DialogHeader>
          <DialogTitle>{isUserCancel ? 'Xác nhận hủy YCSC' : 'Xác nhận từ chối YCSC'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id='confirm-otp-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='cancelled_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Lý do</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Nhập lý do' rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form='confirm-otp-form' loading={loading || cancelling} type='submit'>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
