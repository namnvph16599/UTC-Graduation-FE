import Link from 'next/link';
import { toast } from 'sonner';
import { useRemoveUserByAdminMutation } from '@/src/graphql/mutations/removeUserByAdmin.generated';
import { UserCollectionByAdminDocument } from '@/src/graphql/queries/userCollectionByAdmin.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveUserByAdminMutation({
    onCompleted() {
      toast.error('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [UserCollectionByAdminDocument],
  });

  return (
    <Link
      href={'#'}
      onClick={async () =>
        await removeProductMutation({
          variables: {
            userId: props.id,
          },
        })
      }>
      Xóa
    </Link>
  );
};
