'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Account } from '@/app/(user)/(main-layout)/_components/account';
import { Logo } from '@/components/logo';
import { AppRouter } from '@/lib/constant';
import { cn } from '@/lib/utils';

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

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className='w-full border-b border-input'>
      <div className='mx-auto container flex items-center justify-between'>
        <Logo />
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
        <Account />
      </div>
    </div>
  );
};
