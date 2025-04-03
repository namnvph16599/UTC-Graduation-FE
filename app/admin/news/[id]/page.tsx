import { redirect } from 'next/navigation';
import { NewsForm } from '../_components/news-form';
import { AppRouter } from '@/src/constants/constant';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect(AppRouter.admin.dashboard);
  }

  return <NewsForm id={id} />;
};

export default Page;
