import Link from 'next/link';
import { toast } from 'sonner';
import { useRemoveNewsMutation } from '@/src/graphql/mutations/removeNews.generated';
import { NewsCollectionDocument } from '@/src/graphql/queries/newsCollection.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveNewsMutation({
    onCompleted() {
      toast.error('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [NewsCollectionDocument],
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
