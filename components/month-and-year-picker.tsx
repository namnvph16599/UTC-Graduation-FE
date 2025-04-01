'use client';
import { Combobox } from '@/components/ui/combobox';
import { YearPicker } from '@/components/year-picker';

const monthOptions = [
  { label: 'Tháng 1', value: '1' },
  { label: 'Tháng 2', value: '2' },
  { label: 'Tháng 3', value: '3' },
  { label: 'Tháng 4', value: '4' },
  { label: 'Tháng 5', value: '5' },
  { label: 'Tháng 6', value: '6' },
  { label: 'Tháng 7', value: '7' },
  { label: 'Tháng 8', value: '8' },
  { label: 'Tháng 9', value: '9' },
  { label: 'Tháng 10', value: '10' },
  { label: 'Tháng 11', value: '11' },
  { label: 'Tháng 12', value: '12' },
];

type MonthYearPickerProps = {
  month: string;
  year: string;
  onChange: (month: string, year: string) => void;
};

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ onChange, year, month }) => {
  return (
    <div className='flex gap-6'>
      <Combobox
        className='block min-w-[180px]'
        onChange={(value) => onChange(value as string, year)}
        options={monthOptions}
        removable={false}
        searchable={false}
        value={month}
      />

      <YearPicker onChange={(newYear) => onChange(month, newYear)} value={year} />
    </div>
  );
};
