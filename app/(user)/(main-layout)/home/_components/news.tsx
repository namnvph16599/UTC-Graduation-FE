import Link from 'next/link';

import { NewsBox, NewsEntity } from '@/app/(user)/(main-layout)/_components/news-box';
import { AppRouter } from '@/src/constants/constant';
import { cn } from '@/src/constants/utils';

export const News = () => {
  const newsData = [
    {
      content: 'Exciting advancements in AI are shaping the future of technology.',
      createdAt: '2025-02-25T10:00:00Z',
      description: 'A deep dive into the latest AI innovations.',
      id: '1',
      imageName: 'https://picsum.photos/500/500',
      isPopular: true,
      status: true,
      title: 'AI Revolution in 2025',
    },
    {
      content: 'Electric vehicles are taking over the roads with new innovations.',
      createdAt: '2025-02-24T08:30:00Z',
      description: 'How EV technology is evolving rapidly.',
      id: '2',
      imageName: 'https://picsum.photos/500/500',
      isPopular: false,
      status: true,
      title: 'The Rise of Electric Vehicles',
    },
    {
      content: 'SpaceX announces new Mars mission timeline.',
      createdAt: '2025-02-23T14:20:00Z',
      description: 'What to expect from the next SpaceX launch.',
      id: '3',
      imageName: 'https://picsum.photos/500/500',
      isPopular: true,
      status: true,
      title: "SpaceX's Mars Mission Update",
    },
    {
      content: 'Blockchain continues to disrupt industries worldwide.',
      createdAt: '2025-02-22T17:45:00Z',
      description: 'The future of blockchain beyond cryptocurrency.',
      id: '4',
      imageName: 'https://picsum.photos/500/500',
      isPopular: false,
      status: true,
      title: 'Blockchain Beyond Crypto',
    },
    {
      content: 'Climate change policies are seeing significant updates.',
      createdAt: '2025-02-21T12:10:00Z',
      description: 'Governments worldwide take action on climate change.',
      id: '5',
      imageName: 'https://picsum.photos/500/500',
      isPopular: true,
      status: true,
      title: 'New Global Climate Policies',
    },
  ];

  return (
    <div className={cn('w-full flex justify-center')}>
      <div className='container'>
        <div className='flex justify-between items-end mb-8 mx-4 lg:mx-0'>
          <h1 className={'text-[32px] font-bold text-primary-default'}>Tin tức và cẩm nang</h1>
          <Link className='font-medium text-black-2A' href={AppRouter.user.news}>
            Xem tất cả
          </Link>
        </div>
        <NewsBox convertedNews={[[...newsData]] as NewsEntity[][]} />
      </div>
    </div>
  );
};
