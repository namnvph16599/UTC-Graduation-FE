'use client';
import dayjs from 'dayjs';
import { Wallet } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Loading } from '@/components/app-loading';
import { Combobox } from '@/components/ui/combobox';
import { useRevenueRepairQuery } from '@/src/graphql/queries/revenueRepair.generated';

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);
};

const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year.toString() };
  });
};

export const Revenue = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const [year, setYear] = useState(dayjs().format('YYYY'));

  const { data, loading } = useRevenueRepairQuery({
    variables: {
      year: year,
    },
  });

  const entities = useMemo(() => data?.revenueRepair ?? [], [data?.revenueRepair]);
  const total = useMemo(() => entities.reduce((sum, e) => (sum += Number(e.price ?? 0)), 0), [entities]);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (divRef.current) {
        setWidth(divRef.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Loading loading={loading}>
      <div className='grid grid-cols-10 gap-8 bg-[#F9F9F9] p-5'>
        <div className='p-5 bg-white col-span-7' ref={divRef}>
          <div className='flex justify-end items-center gap-4 mb-5'>
            <p className='font-semibold text-black-1A'> Năm:</p>
            <Combobox
              className='block min-w-[300px]'
              onChange={(value) => setYear((value ?? dayjs().format('YYYY')) as string)}
              options={getYears()}
              removable={false}
              value={year}
            />
          </div>
          <BarChart data={entities} height={250} margin={{ left: 80 }} width={width - 40}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis tickFormatter={(value) => formatVND(value)} />
            <Tooltip formatter={(value) => formatVND(value as number)} />
            <Bar dataKey='price' fill='#FFC42C' />
          </BarChart>
        </div>
        <div className='p-5 bg-white col-span-3'>
          <div className='flex items-center gap-4'>
            <Wallet color='#FFC42C' />
            <div className=''>
              <p className='text-sm text-[#676E72]'>Tổng doanh thu</p>
              <p className='text-xl font-semibold text-[##202C38]'>{formatVND(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};
