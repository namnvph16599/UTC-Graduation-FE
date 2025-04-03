'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { CellRemove } from './cell-remove';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter } from '@/src/constants/constant';
import { NewsEntity } from '@/src/graphql/type.interface';
import { checkValidImage } from '@/src/utils/test-image-address.util';

export const newsColumn: ColumnDef<NewsEntity>[] = [
  {
    accessorKey: 'title',
    header: 'Tiêu đề',
  },
  {
    accessorKey: 'image_url',
    header: 'Hình ảnh',
    cell: ({ row }) => {
      const image_url = row.original.image_url;

      const isValid = checkValidImage(image_url);
      if (!isValid) return null;
      return <Image alt='' className='object-fill rounded' height={50} src={image_url} width={100} />;
    },
  },
  {
    accessorKey: 'id',
    header: 'Xem trước',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link className='text-primary-default' href={AppRouter.user.news + '/' + id}>
          Xem
        </Link>
      );
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-8 w-8 p-0' variant='ghost'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Sao chép ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.news.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CellRemove id={payment.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
