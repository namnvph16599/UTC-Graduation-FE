import type { Metadata } from 'next';
import './globals.css';
import { Quicksand } from 'next/font/google';
import { Toaster } from 'sonner';
import { AppInformation } from '@/lib/constant';

const inter = Quicksand({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: ' Sửa chữa & bảo dưỡng xe máy ' + AppInformation.name,
  description:
    'Cung cấp dịch vụ sửa chữa, bảo dưỡng và nâng cấp xe máy chuyên nghiệp, giúp khách hàng yên tâm trên mọi hành trình. Với đội ngũ thợ lành nghề, tận tâm và hệ thống trang thiết bị hiện đại, chúng tôi cam kết mang đến giải pháp tối ưu cho mọi vấn đề của xe máy, từ sửa chữa động cơ, điện, phanh, đến thay nhớt, lốp và các dịch vụ chăm sóc xe toàn diện.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
