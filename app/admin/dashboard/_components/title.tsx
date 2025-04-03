import React from 'react';

type Props = {
  title: string;
};

export const Title = ({ title }: Props) => {
  return <h1 className='text-black-1A font-semibold border-b border-[#EEEEEE] pb-3 mb-4'>{title}</h1>;
};
