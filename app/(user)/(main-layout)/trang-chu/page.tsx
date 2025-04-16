import { BannerEntity } from '@/src/graphql/type.interface';
import { activeBannersServerQuery } from '@/src/server-hooks/queries/use-active-banners-server-query';
import { Banner } from './_components/banner';
import { News } from './_components/news';
import { Services } from './_components/services';

const HomePage = async () => {
  const data = await activeBannersServerQuery();
  const banners = data?.data?.getActiveBanners ?? [];

  return (
    <>
      <Banner banners={banners as BannerEntity[]} />
      <Services />
      <News />
    </>
  );
};

export default HomePage;
