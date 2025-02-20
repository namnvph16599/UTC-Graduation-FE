'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const waitingStatusColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'services',
    header: 'Dịch vụ',
  },
  {
    accessorKey: 'products',
    header: 'Sản phẩm thêm',
  },
  {
    accessorKey: 'brand',
    header: 'Hãng',
  },
  {
    accessorKey: 'model',
    header: 'Loại xe',
  },
  {
    accessorKey: 'year',
    header: 'Năm sản xuất',
  },
  {
    accessorKey: 'estimated_delivery_time',
    header: 'Thời gian giao xe',
  },
  {
    accessorKey: 'expected_receiving_time',
    header: 'Thời gian lấy xe',
  },
  {
    accessorKey: 'note',
    header: 'KH ghi chú',
  },
  {
    id: 'actions',
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const cancelledStatusColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'services',
    header: 'Dịch vụ',
  },
  {
    accessorKey: 'products',
    header: 'Sản phẩm thêm',
  },
  {
    accessorKey: 'estimated_delivery_time',
    header: 'Thời gian giao xe',
  },
  {
    accessorKey: 'expected_receiving_time',
    header: 'Thời gian lấy xe',
  },
  {
    accessorKey: 'note',
    header: 'KH ghi chú',
  },
  {
    accessorKey: 'cancelled_description',
    header: 'Lý do hủy',
  },
  {
    id: 'actions',
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const finishedStatusColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'services',
    header: 'Dịch vụ',
  },
  {
    accessorKey: 'products',
    header: 'Sản phẩm thêm',
  },
  {
    accessorKey: 'discount',
    header: 'Giảm giá',
  },
  {
    accessorKey: 'total',
    header: 'Tổng tiền',
  },
  {
    id: 'actions',
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
