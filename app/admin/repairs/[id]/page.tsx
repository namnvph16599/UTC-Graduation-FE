import { redirect } from 'next/navigation';
import { DetailRepair } from '../_components/admin-detail-repair';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect('/login');
  }
  return (
    <div>
      <DetailRepair id={id} />
    </div>
  );
};

export default Page;
