'use client';
import dynamic from 'next/dynamic';

const NewsForm = dynamic(() => import('../_components/news-form'), { ssr: false });

const Page = () => {
  return <NewsForm />;
};

export default Page;
