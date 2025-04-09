import { notFound } from 'next/navigation';
import { MotorcycleForm } from '../_components/form';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    notFound();
  }
  return <MotorcycleForm id={id} />;
};

export default Page;
