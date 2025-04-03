'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const NewsForm = dynamic(() => import('../_components/news-form'), { ssr: false });

const Page = () => {
  const params: { id: string } = useParams();
  const id = params.id;

  return <NewsForm id={id} />;
};

export default Page;
