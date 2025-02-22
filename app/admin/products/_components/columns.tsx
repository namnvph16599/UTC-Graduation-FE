'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter } from '@/lib/constant';
import { formatVND } from '@/lib/utils';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductEntity = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const serviceColumns: ColumnDef<ProductEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Tên phụ tùng',
  },
  {
    accessorKey: 'price',
    header: 'Giá tiền',
    cell: ({ row }) => {
      const value = row.original.price;
      return formatVND(value as unknown as number, true);
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
    cell: ({ row }) => {
      const value = row.original.price;
      return formatVND(value as unknown as number);
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
              <Link href={AppRouter.admin.products.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
