'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import { AppPagination } from '@/components/app-pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RepairStatusEnum } from '@/src/graphql/type.interface';
import { TDataTablePagination } from '@/src/types';

interface DataTableProps<TData, TValue> extends TDataTablePagination {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tab?: RepairStatusEnum;
  hiddenPagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onChangePage,
  pageMeta,
  hiddenPagination = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className='h-24 text-center' colSpan={columns.length}>
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hiddenPagination && (
        <AppPagination
          className='justify-end'
          currentPage={pageMeta?.currentPage}
          onChangePage={onChangePage}
          totalPage={pageMeta?.totalPage}
        />
      )}
    </div>
  );
}
