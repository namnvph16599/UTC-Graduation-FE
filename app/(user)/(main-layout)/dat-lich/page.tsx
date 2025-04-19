import BookingPage from '@/app/(user)/(main-layout)/dat-lich/BookingPage';
import { BrandEntity, MotorcycleEntity, UserEntity } from '@/src/graphql/type.interface';
import { brandCollectionServerQuery } from '@/src/server-hooks/queries/use-brand-collection-server-query';
import { meServerQuery } from '@/src/server-hooks/queries/use-me-server-query';
import { myMotorCyclesServerQuery } from '@/src/server-hooks/queries/use-my-motorcycles-server-query';

const Page = async () => {
  const [meData, brandData, myMotorcycleData] = await Promise.all([
    meServerQuery(),
    brandCollectionServerQuery({
      pagination: {
        limit: 10000,
        page: 1,
      },
    }),
    myMotorCyclesServerQuery(),
  ]);

  const user = meData?.data?.me;
  const brands = brandData?.data?.brandCollection?.items ?? [];
  const myMotorcycles = myMotorcycleData?.data?.myMotorcycles?.items ?? [];

  return (
    <BookingPage
      brands={brands as BrandEntity[]}
      myMotorcycles={myMotorcycles as MotorcycleEntity[]}
      user={user as UserEntity}
    />
  );
};

export default Page;
