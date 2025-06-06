'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import Link from 'next/link';
import { CellRemove } from '@/app/admin/staffs/_components/cell-remove';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter } from '@/src/constants/constant';
import { UserEntity } from '@/src/graphql/type.interface';

export const staffColumns: ColumnDef<UserEntity>[] = [
  {
    accessorKey: 'fullName',
    header: 'Tên nhân viên',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại',
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
            <DropdownMenuItem>
              <Link href={AppRouter.admin.staff.edit(payment.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CellRemove id={payment.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
