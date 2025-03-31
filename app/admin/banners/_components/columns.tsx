'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { AppRouter } from '@/src/constants/constant';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BannerEntity = {
  id: string;
  name: string;
  priority_number: number;
  image: string;
  active: boolean;
};

export const serviceColumns: ColumnDef<BannerEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Tên',
  },
  {
    accessorKey: 'image',
    header: 'Ảnh',
    cell: ({ row }) => {
      const banner = row.original;

      return <Image alt={banner.name} className='rounded-md' height={100} src={banner.image} width={100} />;
    },
  },
  {
    accessorKey: 'priority_number',
    header: 'Độ ưu tiên',
  },
  {
    accessorKey: 'active',
    header: 'Kích hoạt',
    cell: ({ row }) => {
      const banner = row.original;

      return <Switch checked={banner.active} />;
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
              <Link href={AppRouter.admin.banners.edit(payment.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
