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
import { AppRouter } from '@/src/constants/constant';
import { RepairEntity } from '@/src/graphql/type.interface';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';

export const motorcycleColumns: ColumnDef<RepairEntity>[] = [
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status;
      return convertRepairStatusEnum(status);
    },
  },
  {
    accessorKey: 'model',
    header: 'Hãng xe',
    cell: ({ row }) => {
      const name = row.original.model?.brand?.name;
      return name;
    },
  },
  {
    accessorKey: 'model',
    header: 'Loại xe',
    cell: ({ row }) => {
      const name = row.original.model?.name;
      return name;
    },
  },
  {
    accessorKey: 'capacity',
    header: 'Dung tích',
  },
  {
    accessorKey: 'manufacture_year',
    header: 'Năm sản xuất',
  },
  {
    accessorKey: 'license_plate',
    header: 'Biển kiểm soát',
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) => {
      const entity = row.original;

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
              <Link href={AppRouter.user.authenticatePages.repairRequest.detail(entity.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
