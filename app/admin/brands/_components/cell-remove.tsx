import Link from 'next/link';
import { toast } from 'sonner';
import { useRemoveBrandMutation } from '@/src/graphql/mutations/removeBrand.generated';
import { BrandCollectionDocument } from '@/src/graphql/queries/brandCollection.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveBrandMutation({
    onCompleted() {
      toast.error('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [BrandCollectionDocument],
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
