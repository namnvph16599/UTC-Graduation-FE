import { Socials } from '@/app/(user)/(main-layout)/_components/socials';
import { AppInformation } from '@/lib/constant';

export default function ContactPage() {
  const inforContact = [
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
  ];
  return (
    <div className='w-full flex justify-center sm:py-20 py-5'>
      <div
        className='container sm:px-[60px] p-4 grid items-start sm:grid-cols-2 sm:gap-6 lg:gap-[60px] gap-4 grid-cols-1'
        data-aos='fade-zoom-in'
        data-aos-delay='500'
        data-aos-easing='ease-in-back'
        data-aos-offset='0'>
        <div className='flex flex-col items-start justify-center'>
          <span className='text-[#042460] font-bold sm:text-[32px] text-[28px] leading-[32px] sm:leading-[40px]'>
            Thông tin liên hệ
          </span>
          <div className='space-y-4 mt-6'>
            {inforContact.map((item) => (
              <div className='group' key={item.label}>
                <div className='flex gap-2 items-start'>
                  <div>
                    <span>{item.label}: </span>
                    <span className='font-medium'>{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
            <Socials />
          </div>
        </div>
        <div className='rounded-16 w-full max-w-[590px] h-full min-h-[450px]'>
          <iframe
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.8751691248626!2d105.80595762323284!3d20.99764043879917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9731aa0031%3A0x50aaf0af568dcf37!2zMjYyYiDEkC4gTmd1eeG7hW4gVHLDo2ksIFRoYW5oIFh1w6JuIFRydW5nLCBUaGFuaCBYdcOibiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1732783120211!5m2!1svi!2s'
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}></iframe>
        </div>
      </div>
    </div>
  );
}
