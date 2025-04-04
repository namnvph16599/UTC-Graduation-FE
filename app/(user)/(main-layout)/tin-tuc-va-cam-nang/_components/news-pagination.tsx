'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { AppPagination } from '@/components/app-pagination';
import { PageMeta } from '@/src/graphql/type.interface';

type Props = {
  pageMeta: PageMeta;
};

export const NewsPagination = ({ pageMeta }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get('page');
  const search = searchParams.get('search');

  const handleChangePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      params.set('search', search ?? '');

      router.push(pathname + '?' + params);

      return params.toString();
    },
    [pathname, router, search, searchParams],
  );
  return (
    <AppPagination
      currentPage={Number(currentPage)}
      onChangePage={handleChangePage}
      totalPage={pageMeta.totalPage ?? 0}
    />
  );
};
