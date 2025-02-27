'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

export const NewsInputSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onFilter = useCallback(
    (search?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      params.set('search', search ?? '');

      router.push(pathname + '?' + params);

      return params.toString();
    },
    [pathname, router, searchParams],
  );
  const search = searchParams.get('search');

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      onFilter(value.trim());
    },
    // delay in ms
    500,
  );

  return (
    <Input
      className='max-w-[380px]'
      defaultValue={search as string}
      onChange={(e) => debounced(e.currentTarget.value)}
      placeholder='Tìm kiếm theo tiêu đề bài viết'
    />
  );
};
