'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { validationMessages } from '@/src/constants/constant';
import { ProductCollectionDocument } from '@/src/graphql/queries/productCollection.generated';
import { RepairDocument } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ErrorMessage } from '@/src/constants/error';
import { useCancelRepairMutation } from '@/src/graphql/mutations/cancelRepair.generated';

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
};

export const ModalCancelRepair = ({ open, setOpen, id }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const [verifyMutation, { loading }] = useCancelRepairMutation({
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

  async function onSubmit(data: z.infer<typeof schema>) {
    await verifyMutation({
      variables: {
        input: {
          cancelled_description: data.cancelled_description,
          id: id,
        },
      },
    });
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className='w-[625px]'>
        <DialogHeader>
          <DialogTitle>Xác nhận từ chối YCSC</DialogTitle>
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
          <Button form='confirm-otp-form' loading={loading} type='submit'>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
