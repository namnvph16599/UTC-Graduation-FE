import { redirect } from 'next/navigation';
import { ContactForm } from '@/app/admin/contacts/[id]/form';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/lib/constant';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  if (!id) {
    redirect(AppRouter.admin.dashboard);
  }

  return (
    <div className='relative'>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.contacts.label,
            href: AppRouter.admin.contacts.list,
          },
          {
            label: 'Xem chi tiết',
            href: '#',
          },
        ]}
      />
      <ContactForm />
    </div>
  );
};

export default Page;
