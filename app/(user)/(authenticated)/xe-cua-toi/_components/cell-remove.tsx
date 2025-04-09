import Link from 'next/link';
import { toast } from 'sonner';
import { useRemoveMotorcycleMutation } from '@/src/graphql/mutations/removeMotorcycle.generated';
import { MotorcycleCollectionDocument } from '@/src/graphql/queries/motorcycleCollection.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeMutation] = useRemoveMotorcycleMutation({
    onCompleted() {
      toast.error('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [MotorcycleCollectionDocument],
  });

  return (
    <Link
      href={'#'}
      onClick={async () =>
        await removeMutation({
          variables: {
            id: props.id,
          },
        })
      }>
      Xóa
    </Link>
  );
};
