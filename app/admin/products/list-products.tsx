'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { serviceColumns } from '@/app/admin/products/_components/columns';
import { DataTable } from '@/app/admin/products/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/lib/constant';
import { useProductCollectionQuery } from '@/src/graphql/queries/productCollection.generated';
import { PageMeta, ProductEntity } from '@/src/graphql/type.interface';

export const ListProducts = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { data } = useProductCollectionQuery({
    variables: {
      paginationArgs: {
        limit: 10,
        page: page,
      },
    },
  });

  const products = data?.productCollection?.items ?? [];
  const pageMeta = data?.productCollection?.meta;

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Phụ tùng thay thế',
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.products.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem} phụ tùng</p>
          <DataTable
            columns={serviceColumns}
            data={products as ProductEntity[]}
            onChangePage={setPage}
            pageMeta={pageMeta as PageMeta}
          />
        </div>
      </div>
    </div>
  );
};
