import { Banner } from '@/app/(user)/(main-layout)/home/_components/banner';
import { News } from '@/app/(user)/(main-layout)/home/_components/news';
import { Services } from '@/app/(user)/(main-layout)/home/_components/services';

const HomePage = () => {
  return (
    <>
      <Banner />
      <Services />
      <News />
    </>
  );
};

export default HomePage;
