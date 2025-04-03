import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { NewsPage } from './news-page';
import { ClockIcon } from '../_components/clock-icon';
import { getClient } from '@/src/configs/apollo';
import { AppRouter } from '@/src/constants/constant';
import { NewsDocument, NewsQueryResponse, NewsQueryVariables } from '@/src/graphql/queries/news.generated';
import {
  NewsCollectionDocument,
  NewsCollectionQueryResponse,
  NewsCollectionQueryVariables,
} from '@/src/graphql/queries/newsCollection.generated';
import { NewsEntity } from '@/src/graphql/type.interface';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const id = (await params).id;
  const client = await getClient();

  const [dataNews, dataMultipleNews] = await Promise.all([
    client.query<NewsQueryResponse, NewsQueryVariables>({
      query: NewsDocument,
      variables: { id: id },
    }),
    client.query<NewsCollectionQueryResponse, NewsCollectionQueryVariables>({
      query: NewsCollectionDocument,
      variables: {
        paginationArgs: {
          limit: 5,
        },
      },
    }),
  ]);

  const news = dataNews?.data?.news;
  const multipleNews = dataMultipleNews?.data?.newsCollection?.items ?? [];

  return (
    <div className='container mx-auto grid grid-cols-3 gap-[30px] 2xl:gap-[60px] py-[48px] px-[16px] lg:px-0'>
      <div className='col-span-3 lg:col-span-2'>{<NewsPage news={news as NewsEntity} />}</div>
      <div className='hidden lg:block'>
        <div className='sticky top-[100px] flex flex-col gap-y-[12px]'>
          {(multipleNews ?? []).map((item) => {
            return (
              <div
                className='grid grid-cols-2 gap-4 p-4 lg:justify-items-center xl:justify-items-start border-[0.5px] border-solid border-[#ECECEC] rounded-xl'
                key={item.id}>
                <div className='relative w-full h-[120px] rounded'>
                  <Link href={AppRouter.user.news + item.id}>
                    <Image alt={item.title} className='object-cover rounded' fill={true} src={''} />
                  </Link>
                </div>
                <div>
                  <div className='flex gap-x-1 items-center'>
                    <ClockIcon />
                    <p className='text-sm text-[#434343]'>{dayjs(item.createdAt).format('HH:mm DD/MM/YYYY')}</p>
                  </div>
                  <Link className='text-[#161616] line-clamp-3  font-semibold mt-2' href={'/tin-tuc/' + item.id}>
                    {item.title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
