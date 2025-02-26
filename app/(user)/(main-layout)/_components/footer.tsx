import Link from 'next/link';
import { memo, ReactNode } from 'react';
import { Socials } from '@/app/(user)/(main-layout)/_components/socials';
import { Logo } from '@/components/logo';
import { AppInformation, AppRouter } from '@/lib/constant';

export const footerMenus = [
  {
    key: 'product',
    title: 'Thông tin liên hệ',
    children: [
      {
        pathname: '#',
        label: 'Email',
        value: AppInformation.email,
      },
      {
        pathname: '#',
        label: 'Hotline',
        value: AppInformation.hotline1,
      },
      {
        pathname: '#',
        label: 'Địa chỉ',
        value: AppInformation.address,
      },
    ],
  },
  {
    key: 'kiem-ke',
    title: 'Dịch vụ',
    children: [
      {
        pathname: AppRouter.user.about,
        value: 'Giới thiệu',
      },
      {
        pathname: AppRouter.user.booking,
        value: 'Đặt lịch',
      },
      {
        pathname: AppRouter.user.news,
        value: 'Tin tức và cẩm nang',
      },
      {
        pathname: AppRouter.user.contact,
        value: 'Liên hệ',
      },
    ],
  },
  {
    key: 'resource',
    title: 'Chính sách',
    children: [
      {
        pathname: '#',
        value: 'Chính sách bảo mật',
      },
      {
        pathname: '#',
        value: 'Chính sách bảo dưỡng',
      },
      {
        pathname: '#',
        value: 'Chính sách đổi trả',
      },
      {
        pathname: '#',
        value: 'Điều khoản dịch vụ',
      },
    ],
  },
];

export const Footer = memo(() => {
  return (
    <footer className='bg-white text-sm leading-6 border-t border-input mt-10' id='footer'>
      <div className='container mx-auto py-8'>
        <div className='grid grid-cols-9'>
          <div className='col-span-9 lg:col-span-3'>
            <Logo />
            <div className='mt-3'>
              <span className='text-black-1A text-base'>
                Cung cấp dịch vụ sửa chữa, bảo dưỡng và nâng cấp xe máy chuyên nghiệp, giúp khách hàng yên tâm trên mọi
                hành trình.
              </span>
            </div>
            <div className='mt-4 md:flex hidden'>
              <Socials />
            </div>
          </div>
          {footerMenus.map((m) => (
            <div className='col-span-9 lg:col-span-2 lg:mx-3 border-b border-white lg:border-b-0' key={m.key}>
              <h3 className='font-bold text-[18px] lg:text-[20px] leading-[25px] mb-3 text-black-4A'>{m.title}</h3>
              {!!m?.children && m?.children?.length > 0 && (
                <nav>
                  <ul>
                    {m.children?.map((mc: { pathname: string; icon?: ReactNode; value: string; label?: string }) => (
                      <li className='mb-10px' key={mc?.value}>
                        <div className='flex flex-wrap gap-x-2 text-base'>
                          {mc?.label && <span>{mc?.label}:</span>}
                          <Link className='text-black-1A font-medium hover:text-primary-default' href={mc.pathname}>
                            {mc.value}
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='px-[8px] lg:px-0 py-15px lg:text-center flex flex-row items-center justify-center bg-c-F1F1F1 bottom'>
        <p className='mb-2 pr-2 lg:pr-0 font-medium md:text-sm text-xs text-black-5A'>
          Copyright © 2025 {AppInformation.name}. Powered by Jayson Ngo
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
