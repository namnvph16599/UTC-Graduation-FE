import { redirect } from 'next/navigation';
import { AppRouter } from '@/src/constants/constant';

const Page = () => {
  redirect(AppRouter.admin.dashboard);
};

export default Page;
