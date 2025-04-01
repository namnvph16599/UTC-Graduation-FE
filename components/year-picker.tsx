'use client';
import dayjs from 'dayjs';
import React from 'react';
import { Combobox } from '@/components/ui/combobox';

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year.toString() };
  });
};

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export const YearPicker = ({ value, onChange }: Props) => {
  return (
    <Combobox
      className='block min-w-[180px]'
      onChange={(value) => onChange((value ?? dayjs().format('YYYY')) as string)}
      options={getYears()}
      removable={false}
      searchable={false}
      value={value}
    />
  );
};
