'use client';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { contactColumns, ContactEntity } from '@/app/admin/contacts/_components/columns';
import { DataTable } from '@/app/admin/contacts/_components/table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';

function getData(): ContactEntity[] {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      name: 'Dịch vụ 1',
      status: false,
      content: 'content',
      created_at: dayjs().toDate(),
      phone: '0376021530',
      email: '',
      note: '',
    },
    // ...
  ];
}

export const ListContacts = () => {
  const router = useRouter();

  const data = getData();

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.contacts.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.contacts.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>10 {AppRouter.admin.contacts.label}</p>
          <DataTable columns={contactColumns} data={data} />
        </div>
      </div>
    </div>
  );
};
