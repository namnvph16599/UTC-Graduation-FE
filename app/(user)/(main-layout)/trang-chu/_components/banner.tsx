import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AppInformation, AppRouter } from '@/lib/constant';

export function Banner() {
  const banners = [
    'https://picsum.photos/2000/2000',
    'https://picsum.photos/2000/2000',
    'https://picsum.photos/2000/2000',
    'https://picsum.photos/2000/2000',
    'https://picsum.photos/2000/2000',
  ];

  return (
    <div className='bg-[#f6f6f6] py-[40px]'>
      <div className='container mx-auto grid grid-cols-2 items-center gap-x-16 '>
        <div>
          <h1 className='my-0 text-[40px] leading-[50px] font-bold text-[#042460] '>
            Sửa chữa & bảo dưỡng xe máy
            <br />
            <span className='text-primary-default inline'>Cửa hàng {AppInformation.name}</span>
          </h1>
          <p className='text-black-5A mt-4'>
            Cung cấp dịch vụ sửa chữa, bảo dưỡng và nâng cấp xe máy chuyên nghiệp, giúp khách hàng yên tâm trên mọi hành
            trình. Với đội ngũ thợ lành nghề, tận tâm và hệ thống trang thiết bị hiện đại, chúng tôi cam kết mang đến
            giải pháp tối ưu cho mọi vấn đề của xe máy, từ sửa chữa động cơ, điện, phanh, đến thay nhớt, lốp và các dịch
            vụ chăm sóc xe toàn diện.
          </p>
          <p className='text-black-5A mt-4'>
            Dịch vụ của {AppInformation.name} không chỉ đảm bảo chất lượng mà còn hướng tới sự tiện lợi, nhanh chóng và
            minh bạch cho khách hàng. Chúng tôi áp dụng công nghệ quản lý tiên tiến, giúp khách hàng theo dõi lịch sử
            sửa chữa, đặt lịch hẹn dễ dàng và nhận tư vấn trực tuyến.
          </p>

          <div className='mt-10 flex'>
            <Link
              className={
                'py-[15px] pl-8 pr-4 font-bold leading-5 rounded-md bg-primary-default text-white flex items-center gap-2 hover:!text-white'
              }
              href={AppRouter.user.booking}>
              Đặt lịch ngay
              <svg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697'
                  stroke='white'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
                <path
                  d='M3.5 12H20.33'
                  stroke='white'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit='10'
                  strokeWidth='1.5'
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <Carousel className='w-full'>
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem className='relative w-full h-[528px]  rounded-md' key={index}>
                  <Image alt='' className='object-cover rounded-md' fill={true} src={banner} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
