import Image from 'next/image';

import { AppInformation } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';
import { FormFastContact } from './form';

export const FastContact = async ({ className }: { defaultOptionId?: string; className?: string }) => {
  return (
    <div className={cn('w-full mt-10 py-[80px] flex justify-center p-4 xl:p-0', className)}>
      <div
        className='container rounded-[32px] bg-[#F1F1F1] flex flex-col gap-4 lg:gap-x-[60px] md:grid grid-cols-2 px-[16px] lg:p-[60px] md:p-8 p-4'
        data-aos='fade-up'
        data-aos-duration='1500'>
        <Image
          alt='contact'
          className='h-full rounded-[16px]'
          height={2088}
          src='/images/fast-contact-bg.jpg'
          width={2280}
        />
        <div className='col-span-1'>
          <h1 className='md:text-[32px] text-[#042460] text-[28px] font-bold leading-[40px] mb-[10px] mt-0 tracking-tight'>
            Đặt lịch tư vấn với <span className='text-primary-default'>{AppInformation.name}</span>
          </h1>
          <span className='text-black-6A text-base leading-[20px]'>
            Chúng tôi áp dụng công nghệ quản lý tiên tiến, giúp khách hàng theo dõi lịch sử sửa chữa, đặt lịch hẹn dễ
            dàng và nhận tư vấn trực tuyến!
          </span>
          <FormFastContact />
        </div>
      </div>
    </div>
  );
};
