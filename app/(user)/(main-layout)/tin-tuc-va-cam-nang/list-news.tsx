import { Suspense } from 'react';
import { NewsBox } from '@/app/(user)/(main-layout)/_components/news-box';
import { NewsInputSearch } from '@/app/(user)/(main-layout)/tin-tuc-va-cam-nang/_components/news-input-search';
import { NewsPagination } from '@/app/(user)/(main-layout)/tin-tuc-va-cam-nang/_components/news-pagination';
import { cn } from '@/src/constants/utils';
import { NewsEntity, PageMeta } from '@/src/graphql/type.interface';
import { chunkNews } from '@/src/utils/chunk-news.util';

type Props = {
  news: NewsEntity[];
  pageMeta: PageMeta;
};

const ListNews = ({ news = [], pageMeta }: Props) => {
  const convertedNews = chunkNews(news);

  return (
    <Suspense>
      <div className={cn('w-full flex justify-center')}>
        <div className='container'>
          <div className='flex justify-between items-end my-8 mx-4 lg:mx-0'>
            <h1 className={'text-[32px] font-bold text-secondary-default'}>Tin tức và cẩm nang</h1>
            <NewsInputSearch />
          </div>
          <div className='flex flex-col gap-4'>
            <NewsBox convertedNews={convertedNews as NewsEntity[][]} />
          </div>
          <div className='flex justify-center'>
            <NewsPagination pageMeta={pageMeta} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ListNews;
