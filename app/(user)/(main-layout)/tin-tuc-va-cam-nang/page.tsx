import ListNews from '@/app/(user)/(main-layout)/tin-tuc-va-cam-nang/list-news';
import { NewsEntity } from '@/src/graphql/type.interface';
import { newsCollectionServerQuery } from '@/src/server-hooks/queries/use-news-collection-server-query';
type Props = {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
};

const Page = async (props: Props) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.search ?? '';

  const data = await newsCollectionServerQuery({
    paginationArgs: {
      limit: 10,
      page: page,
      search: search,
    },
  });

  const news = data?.data?.newsCollection?.items ?? [];
  const pageMeta = data?.data?.newsCollection?.meta;

  return <ListNews news={news as NewsEntity[]} pageMeta={pageMeta} />;
};

export default Page;
