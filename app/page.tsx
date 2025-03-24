import { redirect } from 'next/navigation';
import { AppRouter } from '@/src/constants/constant';

export default function Home() {
  redirect(AppRouter.user.home);
}
