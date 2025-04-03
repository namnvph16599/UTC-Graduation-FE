'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useNewsCollectionQuery } from '@/src/graphql/queries/newsCollection.generated';
import { NewsEntity, PageMeta } from '@/src/graphql/type.interface';
import { newsColumn } from './_components/columns';
import { DataTable } from './_components/table';

export const ListNews = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const { data, loading } = useNewsCollectionQuery({
    variables: {
      paginationArgs: {
        page: page,
      },
    },
  });
  const news = useMemo(() => data?.newsCollection?.items ?? [], [data?.newsCollection?.items]);
  const pageMeta = useMemo(() => data?.newsCollection?.meta, [data?.newsCollection?.meta]);

  return (
    <Loading loading={loading}>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.news.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.news.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem ?? 0} tin tức</p>
          <DataTable
            columns={newsColumn}
            data={news as NewsEntity[]}
            onChangePage={setPage}
            pageMeta={pageMeta as PageMeta}
          />
        </div>
      </div>
    </Loading>
  );
};
