'use client';
import {
  Bike,
  HandPlatter,
  Home,
  Inbox,
  Mails,
  Newspaper,
  PackageSearch,
  Image as ImageIcon,
  UsersRound,
  BadgeJapaneseYen,
  Star,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppRouter } from '@/src/constants/constant';

const items = [
  {
    title: 'Tổng quan',
    url: AppRouter.admin.dashboard,
    icon: Home,
  },
  {
    title: AppRouter.admin.revenue.label,
    url: AppRouter.admin.revenue.path,
    icon: BadgeJapaneseYen,
  },
  {
    title: 'Yêu cầu sửa chữa',
    url: AppRouter.admin.repairs.list,
    icon: Inbox,
  },
  {
    title: 'Phụ tùng thay thế',
    url: AppRouter.admin.products.list,
    icon: PackageSearch,
  },
  {
    title: 'Dịch vụ sửa chữa',
    url: AppRouter.admin.services.list,
    icon: HandPlatter,
  },
  {
    title: AppRouter.admin.brands.label,
    url: AppRouter.admin.brands.list,
    icon: Bike,
  },
  {
    title: AppRouter.admin.reviews.label,
    url: AppRouter.admin.reviews.list,
    icon: Star,
  },
  {
    title: AppRouter.admin.staff.label,
    url: AppRouter.admin.staff.list,
    icon: UsersRound,
  },
  {
    title: 'Banner',
    url: AppRouter.admin.banners.list,
    icon: ImageIcon,
  },
  {
    title: 'Tin tức',
    url: AppRouter.admin.news.list,
    icon: Newspaper,
  },
  {
    title: 'Liên hệ',
    url: AppRouter.admin.contacts.list,
    icon: Mails,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link className='pl-6 pb-2' href={AppRouter.admin.dashboard}>
            <Image alt='' height={44} src={'/svgs/logo.svg'} width={44} />
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
