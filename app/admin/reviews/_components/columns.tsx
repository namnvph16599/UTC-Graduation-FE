'use client';

import { ColumnDef } from '@tanstack/react-table';

import Link from 'next/link';
import RatingStar from '@/components/ui/rating';
import { AppRouter } from '@/src/constants/constant';
import { ReviewEntity } from '@/src/graphql/type.interface';

export const reviewColumns: ColumnDef<ReviewEntity>[] = [
  {
    accessorKey: 'repair.name',
    header: 'Tên KH',
  },
  {
    accessorKey: 'repair.phone',
    header: 'SĐT',
  },
  {
    accessorKey: 'rating',
    header: 'Sao',
    cell: ({ row }) => {
      const rating = row.original.rating;
      return <RatingStar initialRating={rating} />;
    },
  },
  {
    accessorKey: 'content',
    header: 'Nội dung đánh giá',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const repairId = row.original.repair.id;

      return (
        <Link className='text-primary-default underline' href={AppRouter.admin.repairs.edit(repairId)}>
          Xem YCSC
        </Link>
      );
    },
  },
];
