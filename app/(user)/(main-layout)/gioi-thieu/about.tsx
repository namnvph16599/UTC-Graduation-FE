import Image from 'next/image';
import Link from 'next/link';
import { AppInformation } from '@/src/constants/constant';
import { Services } from '../trang-chu/_components/services';

export const TextIntro = ({ text }: { text: string }) => {
  return (
    <div className='bg-primary-light text-primary-default px-2 rounded font-medium inline-block text-sm'>{text}</div>
  );
};

export default function AboutPage() {
  return (
    <div className=''>
      <div className='container mx-auto mb-10'>
        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 md:py-10 px-4 xl:px-0'>
          <div className='col-span-2 lg:col-span-1 relative w-full lg:min-h-[350px]' data-aos='fade-right'>
            <Image
              alt={AppInformation.name}
              className='rounded-md'
              height={1200}
              src={'/images/about-bg.webp'}
              width={1860}
            />
          </div>
          <div className='col-span-2 lg:col-span-1 items-center lg:px-0 xl:p-8' data-aos='fade-left'>
            <div>
              <TextIntro text='Giới thiệu' />
              <h1 className='my-4 xl:text-[32px] text-[28px] leading-[32px] font-bold text-[#042460] xl:leading-[40px]'>
                Về {AppInformation.name}
              </h1>
              <div className='text-base text-black-2A flex flex-col gap-4'>
                <span>
                  {AppInformation.name} là cửa hàng sửa chữa xe máy chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh
                  nghiệm, cung cấp các dịch vụ bảo dưỡng, sửa chữa, thay thế linh kiện chất lượng cao.
                </span>
                <span>
                  Hãy ghé thăm cửa hàng tại địa chỉ:
                  <br />
                  <span className='font-semibold'> {AppInformation.address}</span>
                  <br />
                  Hoặc liên hệ với chúng tôi qua website:
                  <br />
                  <Link className='text-blue-6 font-bold' href={'https://yourmotorrepair.com/'} target='_blank'>
                    {' yourmotorrepair.com '}
                  </Link>
                </span>
              </div>
            </div>
            <div className='mt-8'>
              <h1 className='my-4 xl:text-[32px] text-[28px] leading-[32px] font-bold text-[#042460] xl:leading-[40px]'>
                Cam kết với khách hàng
              </h1>
              <div className='text-base text-black-2A flex flex-col gap-4'>
                <span>
                  Với nhiều năm kinh nghiệm, chúng tôi đã phục vụ hàng ngàn khách hàng hài lòng. Chuyên cung cấp các
                  dịch vụ: bảo dưỡng định kỳ, thay nhớt, sửa chữa động cơ, thay thế phụ tùng chính hãng.
                </span>
                <span>Chúng tôi cam kết mang đến dịch vụ nhanh chóng, uy tín, đảm bảo an toàn cho khách hàng.</span>
              </div>
            </div>
          </div>
        </div>
        <Services />
      </div>
    </div>
  );
}
