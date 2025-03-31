'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import Link from 'next/link';
import { CellRemove } from '@/app/admin/brands/_components/cell-remove';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter } from '@/src/constants/constant';
import { BrandEntity } from '@/src/graphql/type.interface';

export const serviceColumns: ColumnDef<BrandEntity>[] = [
  {
    accessorKey: 'name',
    header: 'Tên thương hiệu',
  },
  {
    accessorKey: 'models',
    header: 'Loại xe',
    cell: ({ row }) => {
      const models = row.original.models;
      return models?.map((m) => m.name).join(', ');
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entity.id)}>Sao chép ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={AppRouter.admin.brands.edit(entity.id)}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CellRemove id={entity.id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
