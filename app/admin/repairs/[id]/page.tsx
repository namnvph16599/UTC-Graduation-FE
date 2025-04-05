import { redirect } from 'next/navigation';
import { CreateRepairForm } from '@/app/admin/repairs/add/_components/repair-form';

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
      <CreateRepairForm id={id} />;
    </div>
  );
};

export default Page;
