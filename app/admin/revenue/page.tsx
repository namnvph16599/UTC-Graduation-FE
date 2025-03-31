import React from 'react';
import { Revenue } from '@/app/admin/revenue/revenue';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { AppRouter } from '@/src/constants/constant';

const Page = () => {
  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.revenue.label,
            href: '#',
          },
        ]}
      />
      <Revenue />
    </div>
  );
};

export default Page;
