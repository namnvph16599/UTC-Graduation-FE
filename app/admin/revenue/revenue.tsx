'use client';
import dayjs from 'dayjs';
import { Wallet } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Loading } from '@/components/app-loading';
import { MonthYearPicker } from '@/components/month-and-year-picker';
import { Combobox } from '@/components/ui/combobox';
import { YearPicker } from '@/components/year-picker';
import { useRevenueRepairQuery } from '@/src/graphql/queries/revenueRepair.generated';
import { RevenueRepairTypeEnum } from '@/src/graphql/type.interface';

const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);
};

export const Revenue = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const [type, setType] = useState(RevenueRepairTypeEnum.MONTH);

  const [year, setYear] = useState(dayjs().format('YYYY'));
  const [month, setMonth] = useState(dayjs().format('M'));

  const startDate = useMemo(
    () =>
      type === RevenueRepairTypeEnum.MONTH
        ? dayjs()
            .set('month', Number(month) - 1)
            .set('years', Number(year))
            .startOf('month')
            .toISOString()
        : dayjs().set('years', Number(year)).startOf('year').toISOString(),
    [month, type, year],
  );
  const endDate = useMemo(
    () =>
      type === RevenueRepairTypeEnum.MONTH
        ? dayjs()
            .set('month', Number(month) - 1)
            .set('years', Number(year))
            .endOf('month')
            .toISOString()
        : dayjs().set('years', Number(year)).endOf('year').toISOString(),
    [month, type, year],
  );

  const { data, loading } = useRevenueRepairQuery({
    variables: {
      input: {
        type: type,
        endDate: endDate,
        startDate: startDate,
      },
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
            <Combobox
              onChange={(value) => setType(value as RevenueRepairTypeEnum)}
              options={[
                {
                  label: 'Tháng',
                  value: RevenueRepairTypeEnum.MONTH,
                },
                {
                  label: 'Năm',
                  value: RevenueRepairTypeEnum.YEAR,
                },
              ]}
              removable={false}
              searchable={false}
              value={type}
            />
            {type === RevenueRepairTypeEnum.YEAR && (
              <YearPicker
                onChange={(newYear) => {
                  setYear(newYear);
                }}
                value={year}
              />
            )}
            {type === RevenueRepairTypeEnum.MONTH && (
              <MonthYearPicker
                month={month}
                onChange={(newMonth, newYear) => {
                  setMonth(newMonth);
                  setYear(newYear);
                }}
                year={year}
              />
            )}
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
