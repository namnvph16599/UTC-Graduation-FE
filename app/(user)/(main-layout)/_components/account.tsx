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
import { UserType } from '@/src/graphql/type.interface';
import { meServerQuery } from '@/src/server-hooks/queries/use-me-server-query';
import { Logout } from './logout';

export const Account = async () => {
  const { data } = await meServerQuery();

  const user = data?.me;
  const isLoggedIn = !!user;

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
            {user?.type === UserType.ADMIN && (
              <DropdownMenuItem>
                <Link href={AppRouter.admin.dashboard}>Trang quản trị</Link>
              </DropdownMenuItem>
            )}
            {user?.type === UserType.USER && (
              <>
                <DropdownMenuItem>
                  <Link href={AppRouter.user.authenticatePages.updateProfile}>Cập nhật hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={AppRouter.user.authenticatePages.repairRequest.path}>Yêu cầu sửa chữa</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={AppRouter.user.authenticatePages.myVehicle.path}>Xe của tôi</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
