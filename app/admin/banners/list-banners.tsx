'use client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { serviceColumns } from '@/app/admin/banners/_components/columns';
import { DataTable } from '@/app/admin/banners/_components/service-table';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button } from '@/components/ui/button';
import { AppRouter } from '@/src/constants/constant';
import { useBannerCollectionQuery } from '@/src/graphql/queries/bannerCollection.generated';
import { BannerEntity, PageMeta } from '@/src/graphql/type.interface';

export const ListBanners = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data } = useBannerCollectionQuery({
    variables: {
      paginationArgs: {
        page: page,
      },
    },
  });

  const banners = data?.bannerCollection?.items ?? [];
  const pageMeta = data?.bannerCollection?.meta;

  return (
    <div>
      <AppBreadcrumb
        items={[
          {
            label: AppRouter.admin.banners.label,
            href: '#',
          },
        ]}
        rightContent={
          <Button
            onClick={() => {
              router.push(AppRouter.admin.banners.add);
            }}
            size={'md'}>
            Thêm <Plus />
          </Button>
        }
      />
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white'>
          <p className='font-semibold text-[#202C38] mt-0 mb-5'>{pageMeta?.totalItem ?? 0} banners</p>
          <DataTable
            columns={serviceColumns}
            data={banners as BannerEntity[]}
            onChangePage={setPage}
            pageMeta={pageMeta as PageMeta}
          />
        </div>
      </div>
    </div>
  );
};
