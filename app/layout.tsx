import './globals.css';
import { CircleCheck, CircleX, Info } from 'lucide-react';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Toaster } from 'sonner';
import { ApolloWrapper } from '@/src/configs/apollo';
import { ReactQueryProvider } from '@/src/configs/react-query';
import { AppInformation } from '@/src/constants/constant';

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
        <ApolloWrapper>
          <ReactQueryProvider>
            {children}
            <Toaster
              icons={{
                success: <CircleCheck color='#1BB045' />,
                warning: <Info color='#FFC42C' />,
                error: <CircleX color='#D63120' />,
              }}
              position='top-right'
            />
          </ReactQueryProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
