'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
  field: FieldValues;
  placeholder?: string;
};

export function DatePicker({ field, placeholder }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
            variant={'normalOutline'}>
            {field.value ? format(field.value, 'PPP') : <span>{placeholder ?? 'Chọn giá trị'}</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-auto p-0'>
        <Calendar
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
          mode='single'
          onSelect={field.onChange}
          selected={field.value}
        />
      </PopoverContent>
    </Popover>
  );
}
