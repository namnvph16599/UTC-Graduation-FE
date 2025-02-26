import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

export const dataSocials = [
  {
    key: 'gmail',
    icon: <Image alt='' className='rounded-md' height={26} src={'/images/gmail.jpg'} width={26} />,
    href: '#',
  },
  {
    key: 'facebook',
    icon: <Image alt='' className='rounded-md' height={26} src={'/images/facebook.jpg'} width={26} />,
    href: 'dataContact.socials.facebook',
  },
  {
    key: 'youtbe',
    icon: <Image alt='' className='rounded-md' height={26} src={'/images/youtube.jpg'} width={26} />,
    href: '#',
  },

  {
    key: 'instagram',
    icon: <Image alt='' className='rounded-md' height={26} src={'/images/instagram.jpg'} width={26} />,
    href: '#',
  },
];

export const Socials = memo(() => {
  return (
    <div>
      <div className='flex flex-row items-center'>
        {dataSocials.map((s) => (
          <Link
            className='w-10 h-10 rounded-full mx-6px flex items-center justify-center bg-[#F6F6F6] border border-white'
            href={s.href}
            key={s.key}
            target='_blank'>
            {s.icon}
          </Link>
        ))}
      </div>
    </div>
  );
});

Socials.displayName = 'Socials';
