import { redirect } from 'next/navigation';
import { AppRouter } from '@/lib/constant';

const Page = () => {
  redirect(AppRouter.admin.dashboard);
};

export default Page;
