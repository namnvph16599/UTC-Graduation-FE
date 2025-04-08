import { Account } from '@/app/(user)/(main-layout)/_components/account';
import { Logo } from '@/components/logo';
import { Navbar } from './navbar';

export const Header = () => {
  return (
    <div className='w-full border-b border-input'>
      <div className='mx-auto container flex items-center justify-between'>
        <Logo />
        <Navbar />
        <Account />
      </div>
    </div>
  );
};
