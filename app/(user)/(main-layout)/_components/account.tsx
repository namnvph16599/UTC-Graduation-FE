'use client';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRouter } from '@/src/constants/constant';
import { useAuth } from '@/src/contexts';

export const Account = () => {
  const { isLoggedIn, isLoading, user, logout } = useAuth();

  if (isLoading) return null;
  if (!isLoggedIn) {
    return (
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
    );
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className='hover:cursor-pointer font-semibold text-secondary-default text-sm'>{user?.phoneNumber}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 text-secondary-default'>
          <DropdownMenuGroup>
            <DropdownMenuItem>Sửa chữa</DropdownMenuItem>
            <DropdownMenuItem>Xe của tôi</DropdownMenuItem>
            <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
