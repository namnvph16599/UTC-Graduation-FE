import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import { useRemoveProductMutation } from '@/src/graphql/mutations/removeProduct.generated';
import { ProductCollectionDocument } from '@/src/graphql/queries/productCollection.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveProductMutation({
    onCompleted() {
      toast.error('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [ProductCollectionDocument],
  });

  return (
    <Link
      href={'#'}
      onClick={async () =>
        await removeProductMutation({
          variables: {
            id: props.id,
          },
        })
      }>
      Xóa
    </Link>
  );
};
