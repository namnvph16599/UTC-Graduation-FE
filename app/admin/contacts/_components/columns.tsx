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
import { AppRouter, DATE_FORMAT } from '@/src/constants/constant';
import { ContactEntity } from '@/src/graphql/type.interface';
import { convertContactStatusEnum } from '@/src/utils/convert-enum.util';

export const contactColumns: ColumnDef<ContactEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'content',
    header: 'Nội dung',
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status;
      return convertContactStatusEnum(status);
    },
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú',
  },
  {
    accessorKey: 'created_at',
    header: 'Thời gian gửi liên hệ',
    cell: ({ row }) => {
      const entity = row.original;

      return dayjs(entity.createdAt).format(DATE_FORMAT.dateTime);
    },
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
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entity.id)}>Sao chép ID</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.contacts.edit(entity.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
