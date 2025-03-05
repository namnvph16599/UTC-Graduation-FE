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
import { AppRouter, DATE_FORMAT } from '@/lib/constant';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContactEntity = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  content: string;
  status: boolean;
  note?: string;
  created_at: Date;
};

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
      const entity = row.original.status;
      return entity ? 'Đã xử lý' : 'Chưa xử lý';
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

      return dayjs(entity.created_at).format(DATE_FORMAT.dateTime);
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
              <Link href={AppRouter.admin.contacts.edit(entity.id)}>Xem chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
