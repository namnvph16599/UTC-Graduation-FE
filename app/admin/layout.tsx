import { ChevronDown } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <div className='flex justify-between items-center px-6 py-2 border-b border-solid border-[#eeeeee]'>
          <SidebarTrigger />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='flex items-center gap-2'>
                Ngo Van Nam
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Đăng xuất</DropdownMenuLabel>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='p-5'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
