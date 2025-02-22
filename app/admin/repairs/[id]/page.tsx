import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect('/login');
  }
  return <div>Page {id}</div>;
};

export default Page;
