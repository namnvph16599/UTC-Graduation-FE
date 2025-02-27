'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { AppPagination } from '@/components/app-pagination';

export const NewsPagination = () => {
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
  return <AppPagination currentPage={Number(currentPage)} onChangePage={handleChangePage} totalPage={10} />;
};
