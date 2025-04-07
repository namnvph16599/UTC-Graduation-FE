'use client';
import { useMemo, useState } from 'react';
import { contactColumns } from '@/app/admin/contacts/_components/columns';
import { ContactFormFilter } from '@/app/admin/contacts/_components/contact-form-filter';
import { DataTable } from '@/app/admin/contacts/_components/table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { AppRouter } from '@/src/constants/constant';
import { useContactCollectionQuery } from '@/src/graphql/queries/contactCollection.generated';
import { ContactStatusEnum, PageMeta } from '@/src/graphql/type.interface';

export const ListContacts = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | null>();
  const [search, setSearch] = useState<string | null>();

  const { data, loading, refetch } = useContactCollectionQuery({
    variables: {
      filterArgs: {
        status: (!!status && status != '' ? status : null) as ContactStatusEnum,
      },
      paginationArgs: {
        limit: 10,
        page: page,
        search: search,
      },
    },
  });

  const contacts = useMemo(() => data?.contactCollection?.items ?? [], [data?.contactCollection?.items]);
  const pageMeta = useMemo(() => data?.contactCollection?.meta, [data?.contactCollection?.meta]);

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.contacts.label,
            href: '#',
          },
        ]}
      />
      <Loading loading={loading}>
        <div className='p-5 bg-[#F9F9F9]'>
          <ContactFormFilter
            onFilter={(values) => {
              setSearch(values?.search);
              setStatus(values?.status);
              setPage(1);
            }}
            onRefresh={() => refetch()}
            onRemoveFilter={() => {
              setSearch(null);
              setStatus(null);
              setPage(1);
            }}
          />
          <div className='p-5 bg-white'>
            <p className='font-semibold text-[#202C38] mt-0 mb-5'>
              {pageMeta?.totalItem ?? 0} {AppRouter.admin.contacts.label}
            </p>
            <DataTable
              columns={contactColumns}
              data={contacts}
              onChangePage={setPage}
              pageMeta={pageMeta as PageMeta}
            />
          </div>
        </div>
      </Loading>
    </div>
  );
};
