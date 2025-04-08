'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AppRouter } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';

const menus = [
  {
    label: 'Trang chủ',
    href: AppRouter.user.home,
  },
  {
    label: 'Giới thiệu',
    href: AppRouter.user.about,
  },
  {
    label: 'Đặt lịch sửa chữa',
    href: AppRouter.user.booking,
  },
  {
    label: 'Tin tức và cẩm nang',
    href: AppRouter.user.news,
  },
  {
    label: 'Liên hệ',
    href: AppRouter.user.contact,
  },
];
export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center'>
      {menus.map((menu) => {
        const isActive = menu.href === pathname;
        return (
          <Link
            className={cn('py-6 px-3 text-sm text-secondary-default hover:text-primary-default font-semibold', {
              'text-primary-default border-b-2 border-primary-default': isActive,
            })}
            href={menu.href}
            key={menu.href}>
            {menu.label}
          </Link>
        );
      })}
    </nav>
  );
};
