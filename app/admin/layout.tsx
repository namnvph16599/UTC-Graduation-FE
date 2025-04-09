import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/src/contexts';
import { AdminHeader } from './_components/admin-header';
import AdminLayout from './_components/admin-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <AdminLayout>
          <main className='w-full'>
            <AdminHeader />
            {children}
          </main>
        </AdminLayout>
      </SidebarProvider>
    </AuthProvider>
  );
}
