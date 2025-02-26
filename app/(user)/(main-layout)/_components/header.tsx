import Link from 'next/link';
import { Logo } from '@/components/logo';
import { AppRouter } from '@/lib/constant';

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
    href: AppRouter.user.home,
  },
  {
    label: 'Liên hệ',
    href: AppRouter.user.home,
  },
];

export const Header = () => {
  return (
    <div className='w-full border-b border-input'>
      <div className='mx-auto container flex items-center justify-between'>
        <Logo />
        <nav className='flex items-center'>
          {menus.map((menu) => {
            return (
              <Link
                className='py-6 px-3 text-sm text-secondary-default hover:text-primary-default font-semibold'
                href={menu.href}
                key={menu.href}>
                {menu.label}
              </Link>
            );
          })}
        </nav>
        <div className='flex items-center gap-x-2 text-sm font-semibold text-secondary-default'>
          <Link className={`py-[10px] px-4`} href={AppRouter.auth.register}>
            Đăng ký miễn phí
          </Link>
          <Link
            className={`line-clamp-1 py-[10px] px-4 rounded-md bg-primary-default text-white`}
            href={AppRouter.auth.login}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};
