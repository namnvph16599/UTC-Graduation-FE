import React from 'react';
import { Footer } from '@/app/(user)/(main-layout)/_components/footer';
import { Header } from '@/app/(user)/(main-layout)/_components/header';
import { Banner } from '@/app/(user)/(main-layout)/home/_components/banner';
import { News } from '@/app/(user)/(main-layout)/home/_components/news';
import { Services } from '@/app/(user)/(main-layout)/home/_components/services';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Services />
      <News />
      <Footer />
    </div>
  );
};

export default HomePage;
