import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/app/(user)/dang-nhap/_components';

const Login = () => {
  return (
    <div className='grid grid-cols-3 h-svh'>
      <div className='col-span-1 relative'>
        <Image alt='' fill src={'/images/auth-banner.png'} />
      </div>
      <div className='col-span-2'>
        <div className='py-7 px-12 flex justify-end mb-[94px]'>
          <Link href={'/'}>
            <Image alt='' height={48} src={'/svgs/logo.svg'} width={52} />
          </Link>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
