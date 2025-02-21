import Link from 'next/link';
import React, { Fragment, ReactNode } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AppRouter } from '@/lib/constant';

type Props = {
  items: { label: string; href: string }[];
  rightContent?: ReactNode;
};

export const AppBreadcrumb = ({ items, rightContent }: Props) => {
  return (
    <div className='px-6 py-4 flex items-center justify-between border-b border-[#eeeeee]'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={AppRouter.admin.dashboard}>Tổng quan</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
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
