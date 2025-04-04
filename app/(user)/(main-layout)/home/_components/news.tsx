import Link from 'next/link';

import { NewsBox } from '@/app/(user)/(main-layout)/_components/news-box';
import { AppRouter } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';
import { NewsEntity } from '@/src/graphql/type.interface';
import { newsCollectionServerQuery } from '@/src/server-hooks/queries/use-news-collection-server-query';

export const News = async () => {
  const data = await newsCollectionServerQuery({
    paginationArgs: {
      limit: 5,
      page: 1,
    },
  });

  const news = data?.data?.newsCollection?.items ?? [];

  return (
    <div className={cn('w-full flex justify-center')}>
      <div className='container'>
        <div className='flex justify-between items-end mb-8 mx-4 lg:mx-0'>
          <h1 className={'text-[32px] font-bold text-primary-default'}>Tin tức và cẩm nang</h1>
          <Link className='font-medium text-black-2A' href={AppRouter.user.news}>
            Xem tất cả
          </Link>
        </div>
        <NewsBox convertedNews={[[...news]] as NewsEntity[][]} />
      </div>
    </div>
  );
};
