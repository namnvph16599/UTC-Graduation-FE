'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/src/contexts';

export const Logout = () => {
  const { logout } = useAuth();
  return (
    <DropdownMenuItem
      onClick={() => {
        logout();
        window.location.reload();
      }}>
      Đăng xuất
    </DropdownMenuItem>
  );
};
