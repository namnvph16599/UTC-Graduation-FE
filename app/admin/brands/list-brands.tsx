'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { serviceColumns } from '@/app/admin/brands/_components/columns';
import { DataTable } from '@/app/admin/brands/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';
import { useBrandCollectionQuery } from '@/src/graphql/queries/brandCollection.generated';
import { BrandEntity, PageMeta } from '@/src/graphql/type.interface';

export const ListBrands = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { data } = useBrandCollectionQuery({
    variables: {
      pagination: {
        limit: 10,
        page: page,
      },
    },
  });

  const brands = useMemo(() => data?.brandCollection?.items ?? [], [data?.brandCollection?.items]);
  const meta = useMemo(() => data?.brandCollection?.meta, [data?.brandCollection?.meta]);

  const total = useMemo(() => data?.brandCollection?.meta?.totalItem ?? 0, [data?.brandCollection?.meta?.totalItem]);
  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.brands.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.brands.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{total} hãng </p>
          <DataTable
            columns={serviceColumns as BrandEntity[]}
            data={brands}
            handleChangePage={setPage}
            pageMeta={meta as PageMeta}
          />
        </div>
      </div>
    </div>
  );
};
