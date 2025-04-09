import React from 'react';
import { Footer } from '@/app/(user)/(main-layout)/_components/footer';
import { Header } from '@/app/(user)/(main-layout)/_components/header';
import { FastContact } from '@/components/fast-contact/fast-contact';
import { AuthProvider } from '@/src/contexts';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <FastContact />
      <Footer />
    </AuthProvider>
  );
}
