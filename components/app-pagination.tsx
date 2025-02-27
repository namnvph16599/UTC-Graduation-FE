'use client';
import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  readonly currentPage: number;
  readonly onChangePage: (newPage: number) => void;
  readonly totalPage: number;
};

export function AppPagination({ currentPage, onChangePage, totalPage }: Props) {
  const renderContent = useCallback(() => {
    const pagesToShow = 3;
    const pages: number[] = [];

    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(startPage + pagesToShow - 1, totalPage);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className='flex justify-center items-center gap-1 mt-6'>
        <span
          className='inline-block w-[34px] h-[30px] text-center leading-[30px] hover:cursor-pointer text-sm font-semibold text-secondary-default'
          onClick={() => onChangePage(1)}>
          Đầu
        </span>

        {pages.map((page) => (
          <span
            className={cn(
              'flex items-center justify-center rounded w-[34px] h-[30px] text-center leading-[30px] hover:cursor-pointer text-sm font-semibold text-secondary-default ',
              {
                'bg-primary-default text-white': page === currentPage,
                'bg-[#F6F7FB]': page !== currentPage,
              },
            )}
            key={page}
            onClick={() => onChangePage(page)}>
            {page}
          </span>
        ))}
        {endPage + 1 < totalPage && (
          <>
            <span className='inline-block rounded w-[34px] h-[30px] text-center leading-[30px] text-sm font-semibold text-secondary-default bg-[#F6F7FB]'>
              ...
            </span>
            <span
              className='inline-block rounded w-[34px] h-[30px] text-center leading-[30px] hover:cursor-pointer text-sm font-semibold text-secondary-default bg-[#F6F7FB]'
              onClick={() => onChangePage(totalPage)}>
              {totalPage}
            </span>
          </>
        )}
        <span
          className='inline-block w-[34px] h-[30px] text-center leading-[30px] hover:cursor-pointer text-sm font-semibold text-secondary-default'
          onClick={() => onChangePage(totalPage)}>
          Cuối
        </span>
      </div>
    );
  }, [currentPage, onChangePage, totalPage]);
  return renderContent();
}
