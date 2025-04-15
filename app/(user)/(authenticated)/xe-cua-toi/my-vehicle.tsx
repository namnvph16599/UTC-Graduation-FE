'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';
import { useMotorcycleCollectionQuery } from '@/src/graphql/queries/motorcycleCollection.generated';
import { MotorcycleEntity, PageMeta } from '@/src/graphql/type.interface';
import { motorcycleColumns } from './_components/columns';
import { DataTable } from './_components/table';

export const MyVehicle = () => {
  const router = useRouter();

  const { user } = useAuth();

  const [page, setPage] = useState(1);

  const { data } = useMotorcycleCollectionQuery({
    variables: {
      pagination: {
        limit: 10,
        page: page,
      },
      filterArgs: {
        user_id: user?.id,
      },
    },
  });

  const services = data?.motorcycleCollection.items ?? [];
  const pageMeta = data?.motorcycleCollection.meta;

  return (
    <div className='container mx-auto'>
      <AppBreadcrumb
        className='px-0 mb-4'
        isAdmin={false}
        isUser={true}
        items={[
          {
            label: AppRouter.user.authenticatePages.myVehicle.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.user.authenticatePages.myVehicle.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className=''>
        <p className='font-semibold text-secondary-default mt-0 mb-5'>{pageMeta?.totalItem ?? 0} xe</p>
        <DataTable
          columns={motorcycleColumns}
          data={services as MotorcycleEntity[]}
          onChangePage={setPage}
          pageMeta={pageMeta as PageMeta}
        />
      </div>
    </div>
  );
};
