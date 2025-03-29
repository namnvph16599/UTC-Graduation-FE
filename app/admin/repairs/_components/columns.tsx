'use client';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
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
import { AppRouter } from '@/src/constants/constant';
import { RepairEntity } from '@/src/graphql/type.interface';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const waitingStatusColumns: ColumnDef<RepairEntity>[] = [
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
    cell: ({ row }) => {
      const services = row.original.services ?? [];
      return services.map((s) => s.service.name).join(', ');
    },
  },
  {
    accessorKey: 'products',
    header: 'Phụ tùng thay thế',
    cell: ({ row }) => {
      const products = row.original.products ?? [];
      return products.map((s) => s.product.name).join(', ');
    },
  },
  {
    accessorKey: 'brand',
    header: 'Hãng',
    cell: ({ row }) => {
      const model = row.original.model;
      return model?.brand?.name;
    },
  },
  {
    accessorKey: 'model',
    header: 'Loại xe',
    cell: ({ row }) => {
      const model = row.original.model;
      return model?.name;
    },
  },
  {
    accessorKey: 'manufacture_year',
    header: 'Năm sản xuất',
  },
  {
    accessorKey: 'estimated_delivery_time',
    header: 'Thời gian giao xe',
    cell: ({ row }) => {
      const estimated_delivery_time = row.original.estimated_delivery_time;
      if (!estimated_delivery_time) return '';
      return dayjs(estimated_delivery_time).format('HH:mm DD/MM/YYYY');
    },
  },
  {
    accessorKey: 'expected_receiving_time',
    header: 'Thời gian lấy xe',
    cell: ({ row }) => {
      const expected_receiving_time = row.original.expected_receiving_time;
      if (!expected_receiving_time) return '';
      return dayjs(expected_receiving_time).format('HH:mm DD/MM/YYYY');
    },
  },
  {
    accessorKey: 'description_of_customer',
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Sao chép ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const cancelledStatusColumns: ColumnDef<RepairEntity>[] = [
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
    cell: ({ row }) => {
      const services = row.original.services ?? [];
      return services.map((s) => s.service.name).join(', ');
    },
  },
  {
    accessorKey: 'products',
    header: 'Phụ tùng thay thế',
    cell: ({ row }) => {
      const products = row.original.products ?? [];
      return products.map((s) => s.product.name).join(', ');
    },
  },
  {
    accessorKey: 'estimated_delivery_time',
    header: 'Thời gian giao xe',
    cell: ({ row }) => {
      const estimated_delivery_time = row.original.estimated_delivery_time;
      if (!estimated_delivery_time) return '';
      return dayjs(estimated_delivery_time).format('HH:mm DD/MM/YYYY');
    },
  },
  {
    accessorKey: 'expected_receiving_time',
    header: 'Thời gian lấy xe',
    cell: ({ row }) => {
      const expected_receiving_time = row.original.expected_receiving_time;
      if (!expected_receiving_time) return '';
      return dayjs(expected_receiving_time).format('HH:mm DD/MM/YYYY');
    },
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Sao chép ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const finishedStatusColumns: ColumnDef<RepairEntity>[] = [
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
    cell: ({ row }) => {
      const services = row.original.services ?? [];
      return services.map((s) => s.service.name).join(', ');
    },
  },
  {
    accessorKey: 'products',
    header: 'Phụ tùng thay thế',
    cell: ({ row }) => {
      const products = row.original.products ?? [];
      return products.map((s) => s.product.name).join(', ');
    },
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Sao chép ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
