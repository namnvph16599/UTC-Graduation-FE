import Link from 'next/link';
import { toast } from 'sonner';
import { BannerCollectionDocument } from '@/src/graphql/queries/bannerCollection.generated';
import { useRemoveBannerMutation } from '@/src/graphql/mutations/removeBanner.generated';

type Props = { id: string };

export const CellRemove = (props: Props) => {
  const [removeProductMutation] = useRemoveBannerMutation({
    onCompleted() {
      toast.success('Xóa thành công!');
    },
    onError(error) {
      toast.error('Đã có lỗi xảy ra', {
        description: error.message,
      });
    },
    refetchQueries: [BannerCollectionDocument],
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
