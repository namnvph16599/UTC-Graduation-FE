import { Banner } from '@/app/(user)/(main-layout)/home/_components/banner';
import { News } from '@/app/(user)/(main-layout)/home/_components/news';
import { Services } from '@/app/(user)/(main-layout)/home/_components/services';
import { FastContact } from '@/components/fast-contact/fast-contact';

const HomePage = () => {
  return (
    <>
      <Banner />
      <Services />
      <News />
      <FastContact />
    </>
  );
};

export default HomePage;
