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
import RatingStar from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import { validationMessages } from '@/src/constants/constant';
import { ErrorMessage } from '@/src/constants/error';
import { useCreateReviewMutation } from '@/src/graphql/mutations/createReview.generated';
import { ProductCollectionDocument } from '@/src/graphql/queries/productCollection.generated';
import { RepairDocument } from '@/src/graphql/queries/repair.generated';
import { RepairCollectionDocument } from '@/src/graphql/queries/repairCollection.generated';

const schema = z.object({
  content: z
    .string({
      message: validationMessages.required,
    })
    .min(1, {
      message: validationMessages.required,
    }),
  rating: z
    .number({
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

export const ModalReviewRepairRequest = ({ open, setOpen, id }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const [adminCancelRepairRequest, { loading }] = useCreateReviewMutation({
    onCompleted() {
      toast.success('Đánh giá yêu cầu sửa chữa thành công!');
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
      await adminCancelRepairRequest({
        variables: {
          input: {
            content: data.content,
            rating: data.rating,
            repairId: id,
          },
        },
      });
    },
    [adminCancelRepairRequest, id],
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className='w-[625px]'>
        <DialogHeader>
          <DialogTitle>{'Đánh giá yêu cầu sửa chữa'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id='confirm-otp-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem className='mb-5'>
                  <FormLabel required>Điểm</FormLabel>
                  <FormControl>
                    <RatingStar initialRating={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nội dung đánh giá</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Nhập nội dung' rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form='confirm-otp-form' loading={loading} type='submit'>
            Gửi đánh giá
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
