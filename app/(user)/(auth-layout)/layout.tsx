import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { Logo } from '@/components/logo';
import { AuthProvider } from '@/src/contexts';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <div className='grid grid-cols-3 h-svh'>
        <div className='col-span-1 relative'>
          <Image alt='' fill src={'/images/about-bg.webp'} />
        </div>
        <div className='col-span-2'>
          <div className='py-7 px-12 flex justify-end mb-[94px]'>
            <Logo />
          </div>

          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
