'use client';
import { useCallback, useMemo, useState } from 'react';
import { z } from 'zod';
import { filterReviewSchema, ReviewFormFilter } from './_components/form-filter';
import { reviewColumns } from '@/app/admin/reviews/_components/columns';
import { DataTable } from '@/app/admin/reviews/_components/table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Loading } from '@/components/app-loading';
import { AppRouter } from '@/src/constants/constant';
import { useReviewCollectionQuery } from '@/src/graphql/queries/reviewCollection.generated';
import { PageMeta, ReviewConnectionFilterArgs, ReviewEntity } from '@/src/graphql/type.interface';

export const ListReviews = () => {
  const [page, setPage] = useState(1);
  const [args, setArgs] = useState<ReviewConnectionFilterArgs | null>();

  const { data, loading } = useReviewCollectionQuery({
    variables: {
      paginationArgs: {
        page: page,
        limit: 10,
      },
      filterArgs: {
        rating: args?.rating,
      },
    },
  });

  const repairs = useMemo(() => data?.reviewCollection?.items ?? [], [data?.reviewCollection?.items]);
  const pageMeta = useMemo(() => data?.reviewCollection?.meta, [data?.reviewCollection?.meta]);

  const handleFilter = useCallback((values: z.infer<typeof filterReviewSchema>) => {
    setArgs({
      rating: values.rating ? Number(values.rating) : undefined,
    });
    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback(() => {
    setArgs({
      rating: undefined,
    });
    setPage(1);
  }, []);

  return (
    <Loading loading={loading}>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.reviews.label,
            href: '#',
          },
        ]}
      />

      <div className='p-5 bg-[#F9F9F9]'>
        <ReviewFormFilter onFilter={handleFilter} onRemoveFilter={handleRemoveFilter} />
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem ?? 0} đánh giá</p>
          <DataTable
            columns={reviewColumns}
            data={repairs as ReviewEntity[]}
            onChangePage={setPage}
            pageMeta={pageMeta as PageMeta}
          />
        </div>
      </div>
    </Loading>
  );
};
