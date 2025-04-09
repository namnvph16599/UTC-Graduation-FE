import React from 'react';
import BookingPage from '@/app/(user)/(main-layout)/dat-lich/BookingPage';
import { BrandEntity, MotorcycleEntity, UserEntity } from '@/src/graphql/type.interface';
import { brandCollectionServerQuery } from '@/src/server-hooks/queries/use-brand-collection-server-query';
import { meServerQuery } from '@/src/server-hooks/queries/use-me-server-query';
import { myMotorCyclesServerQuery } from '@/src/server-hooks/queries/use-my-motorcycles-server-query';
import { serviceCollectionServerQuery } from '@/src/server-hooks/queries/use-services-collection-server-query';

const Page = async () => {
  const [meData, serviceData, brandData, myMotorcycleData] = await Promise.all([
    meServerQuery(),
    serviceCollectionServerQuery({
      paginationArgs: {
        limit: 10000,
        page: 1,
      },
    }),
    brandCollectionServerQuery({
      pagination: {
        limit: 10000,
        page: 1,
      },
    }),
    myMotorCyclesServerQuery(),
  ]);

  console.log('meData', meData);
  console.log('myMotorcycleData', myMotorcycleData);

  const user = meData?.data?.me;
  const services = serviceData?.data?.serviceCollection?.items ?? [];
  const brands = brandData?.data?.brandCollection?.items ?? [];
  const myMotorcycles = myMotorcycleData?.data?.myMotorcycles?.items ?? [];

  return (
    <BookingPage
      brands={brands as BrandEntity[]}
      myMotorcycles={myMotorcycles as MotorcycleEntity[]}
      services={services}
      user={user as UserEntity}
    />
  );
};

export default Page;
