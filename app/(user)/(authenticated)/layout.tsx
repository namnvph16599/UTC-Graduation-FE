import React from 'react';
import { Footer } from '@/app/(user)/(main-layout)/_components/footer';
import { Header } from '@/app/(user)/(main-layout)/_components/header';
import { AuthProvider } from '@/src/contexts';
import { AuthenticateLayout } from './_components/authenticate-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <AuthenticateLayout>{children}</AuthenticateLayout>
      <Footer />
    </AuthProvider>
  );
}
