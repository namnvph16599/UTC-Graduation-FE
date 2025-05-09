'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { serviceColumns } from '@/app/admin/services/_components/columns';
import { DataTable } from '@/app/admin/services/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useServiceCollectionQuery } from '@/src/graphql/queries/serviceCollection.generated';
import { PageMeta, ServicesEntity } from '@/src/graphql/type.interface';
import { ServiceFormFilter } from './_components/service-form-filter';

export const ListServices = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string | null>();

  const { data } = useServiceCollectionQuery({
    variables: {
      paginationArgs: {
        limit: 10,
        page: page,
        search: search,
      },
    },
  });

  const services = data?.serviceCollection.items ?? [];
  const total = data?.serviceCollection.meta?.totalItem ?? [];

  const handleFilter = useCallback((values: { search?: string }) => {
    setSearch(values?.search ?? '');
    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback(() => {
    setSearch('');
    setPage(1);
  }, []);

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: 'Dịch vụ sửa chữa',
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.services.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <ServiceFormFilter onFilterAction={handleFilter} onRemoveFilterAction={handleRemoveFilter} />
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{total} dịch vụ</p>
          <DataTable
            columns={serviceColumns}
            data={services as ServicesEntity[]}
            onChangePage={setPage}
            pageMeta={data?.serviceCollection?.meta as PageMeta}
          />
        </div>
      </div>
    </div>
  );
};
