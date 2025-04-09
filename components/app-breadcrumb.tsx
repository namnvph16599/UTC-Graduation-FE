import Link from 'next/link';
import React, { Fragment, ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AppRouter } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';

type Props = {
  items: { label: string; href: string }[];
  rightContent?: ReactNode;
  isAdmin?: boolean;
  isUser?: boolean;
  className?: string;
};

export const AppBreadcrumb = ({ items, rightContent, isAdmin = true, isUser = false, className }: Props) => {
  return (
    <div className={cn('bg-white px-6 py-4 flex items-center justify-between border-b border-[#eeeeee]', className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {isAdmin && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={AppRouter.admin.dashboard}>Tổng quan</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {isUser && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={AppRouter.user.home}>Trang chủ</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {items.map((item, idx) => {
            return (
              <Fragment key={item.label}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {idx < items.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {rightContent}
    </div>
  );
};
