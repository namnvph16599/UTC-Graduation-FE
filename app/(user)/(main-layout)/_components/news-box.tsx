import dayjs from 'dayjs';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { AppRouter, DATE_FORMAT } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';
import { NewsEntity } from '@/src/graphql/type.interface';
import { getImageUrlOfNews } from '@/src/utils/chunk-news.util';

type Props = {
  convertedNews: NewsEntity[][];
};

export const NewsBox = ({ convertedNews }: Props) => {
  return convertedNews.map((news, idx) => {
    //  Please change this condition if limit is greater than 10
    const isEven = idx > 0;
    const firstNews = isEven ? news?.[4] : news?.[0];
    return (
      <div className={cn('grid grid-cols-2 gap-4 px-4 lg:px-0')} data-aos='fade-up' key={idx}>
        {firstNews && (
          <div
            className={cn(
              'col-span-2 lg:col-span-1 rounded-lg p-4 border border-solid border-[#ECECEC] detail-news-shadow',
              {
                'order-last': firstNews?.id === news?.[4]?.id,
              },
            )}
            key={firstNews.id}>
            <NewsImage
              alt={firstNews.title}
              className='sm:h-[290px]'
              newsId={firstNews.id}
              src={getImageUrlOfNews(firstNews.image_url)}
            />
            <div className='pt-4'>
              <div className='flex gap-x-1 items-center'>
                <ClockIcon />
                <p className='text-sm font-medium text-black-4A'>
                  {dayjs(firstNews.createdAt).format(DATE_FORMAT.date)}
                </p>
              </div>
              <Link
                className='font-semibold mb-3 mt-2 text-secondary-default text-md line-clamp-2 leading-[22px]'
                href={AppRouter.user.news + '/' + firstNews.id}>
                {firstNews.title}
              </Link>
              <p className='text-black-3A text-ellipsis line-clamp-2 lg:line-clamp-5'>{firstNews.description}</p>
            </div>
          </div>
        )}
        <div className='col-span-2 lg:col-span-1'>
          <div className='grid grid-cols-2 gap-4'>
            {news.map((it, idx) => {
              if (it.id === firstNews?.id) return null;
              return (
                <div className='col-span-2 sm:col-span-1 rounded-lg p-4 border border-solid border-[#ECECEC]' key={idx}>
                  <NewsImage
                    alt={it.title}
                    className='w-[640px]'
                    newsId={it.id}
                    src={getImageUrlOfNews(it.image_url)}
                  />
                  <div className='pt-4'>
                    <div className='flex gap-x-1 items-center'>
                      <ClockIcon />
                      <p className='text-sm font-medium text-black-4A'>
                        {dayjs(it.createdAt).format(DATE_FORMAT.date)}
                      </p>
                    </div>
                    <Link
                      className='font-semibold mb-3 mt-2 text-secondary-default text-md line-clamp-2 leading-[22px]'
                      href={AppRouter.user.news + '/' + it.id}>
                      {it.title}
                    </Link>
                    <p className='text-black-3A text-ellipsis line-clamp-2'>{it.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  });
};

type NewsImageProps = {
  newsId: string;
  className?: string;
} & ImageProps;

export const NewsImage = ({ src, alt, className }: NewsImageProps) => {
  return (
    <Link className={cn('relative h-[120px] w-[720px] hover:cursor-pointer', className)} href={''}>
      <Image alt={alt} className='rounded-md object-cover' height={120} loading='lazy' src={src} width={720} />
    </Link>
  );
};

const ClockIcon = () => {
  return (
    <svg fill='none' height='16' viewBox='0 0 16 16' width='16' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8 5.33333V8L10 10M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8Z'
        stroke='#4A4A4A'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
