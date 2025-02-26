import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link className='flex items-center gap-2' href={'/'}>
      <Image alt='Call me' height={56} priority={true} quality={100} src={'/images/logo.png'} width={56} />
      <span className='font-bold text-xl text-primary-default'>suachua24h</span>
    </Link>
  );
};
