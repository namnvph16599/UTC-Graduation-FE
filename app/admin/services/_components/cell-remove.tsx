import Link from 'next/link';
import { toast } from 'sonner';
import { useRemoveServiceMutation } from '@/src/graphql/mutations/removeService.generated';
import { ServiceCollectionDocument } from '@/src/graphql/queries/serviceCollection.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveServiceMutation({
    onCompleted() {
      toast.success('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [ServiceCollectionDocument],
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
