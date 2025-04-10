import { notFound } from 'next/navigation';
import { DetailRepairRequest } from '@/app/(user)/(authenticated)/yeu-cau-sua-chua/[id]/detail-repair-request';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    notFound();
  }
  return <DetailRepairRequest id={id} />;
};

export default Page;
