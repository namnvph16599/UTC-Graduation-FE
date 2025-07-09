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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter, DATE_FORMAT } from '@/src/constants/constant';
import { formatVND } from '@/src/constants/utils';
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
    header: 'Nội dung sửa chữa',
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
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const repairColumns: ColumnDef<RepairEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'license_plate',
    header: 'Biển kiểm soát',
  },
  {
    accessorKey: 'estimated_delivery_time',
    header: 'Thời gian giao xe',
    cell: ({ row }) => {
      const estimated_delivery_time = row.original.estimated_delivery_time;
      if (!estimated_delivery_time) return '';
      return dayjs(estimated_delivery_time).format(DATE_FORMAT.dateTime);
    },
  },
  {
    accessorKey: 'expected_receiving_time',
    header: 'Thời gian lấy xe',
    cell: ({ row }) => {
      const expected_receiving_time = row.original.expected_receiving_time;
      if (!expected_receiving_time) return '';
      return dayjs(expected_receiving_time).format(DATE_FORMAT.dateTime);
    },
  },
  {
    accessorKey: 'description_of_customer',
    header: 'Nội dung sửa chữa',
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Trạng thái',
  //   cell: ({ row }) => {
  //     const status = row.original.status;
  //     return convertRepairStatusEnum(status);
  //   },
  // },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      if (!createdAt) return '';
      return dayjs(createdAt).format('HH:mm DD/MM/YYYY');
    },
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
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
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
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
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
    accessorKey: 'discount_percent',
    header: 'Giá phụ tùng',
    cell: ({ row }) => {
      const products = row.original.products ?? [];
      return formatVND(products.reduce((sum, currentValue) => sum + currentValue?.quantity * currentValue?.price, 0));
    },
  },
  {
    accessorKey: 'discount_percent',
    header: 'Giá dịch vụ',
    cell: ({ row }) => {
      const services = row.original.services ?? [];
      return formatVND(services.reduce((sum, currentValue) => sum + currentValue.price, 0));
    },
  },
  {
    accessorKey: 'discount_percent',
    header: 'Giảm giá',
  },
  {
    accessorKey: 'total',
    header: 'Tổng tiền',
    cell: ({ row }) => {
      const total = row.original.total;
      return formatVND(total ?? 0);
    },
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
            <DropdownMenuItem>
              <Link href={AppRouter.admin.repairs.edit(payment.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
