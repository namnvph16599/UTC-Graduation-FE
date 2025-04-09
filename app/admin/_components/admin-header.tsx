'use client';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/src/contexts';

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  return (
    <div className='bg-white flex justify-between items-center px-6 py-2 border-b border-solid border-[#eeeeee]'>
      <SidebarTrigger />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center gap-2'>
            {user?.phoneNumber ?? 'Admin'}
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel onClick={() => logout()}>Đăng xuất</DropdownMenuLabel>
          {/* <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
