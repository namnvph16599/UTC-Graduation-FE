'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Props = {
  field: FieldValues;
  placeholder?: string;
  hourTypes?: 'all' | 'day' | 'night';
};

export function DateTimePickerForm({ field, hourTypes = 'all' }: Props) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      field.onChange(date);
    }
  }

  function getTimeType() {
    switch (hourTypes) {
      case 'day':
        return ['AM'];
      case 'night':
        return ['PM'];
      default:
        return ['AM', 'PM'];
    }
  }

  function handleTimeChange(type: 'hour' | 'minute' | 'ampm', value: string) {
    const currentDate = field.value || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === 'ampm') {
      const hours = newDate.getHours();
      if (value === 'AM' && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === 'PM' && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    field.onChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
            variant={'normalOutline'}>
            {field.value ? format(field.value, 'dd/MM/yyyy hh:mm aa') : <span>DD/MM/YYYY hh:mm aa</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar initialFocus mode='single' onSelect={handleDateSelect} selected={field.value} />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .map((hour) => (
                    <Button
                      className='sm:w-full shrink-0 aspect-square'
                      key={hour}
                      onClick={() => handleTimeChange('hour', hour.toString())}
                      size='icon'
                      variant={field.value && field.value.getHours() % 12 === hour % 12 ? 'default' : 'ghost'}>
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar className='sm:hidden' orientation='horizontal' />
            </ScrollArea>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    className='sm:w-full shrink-0 aspect-square'
                    key={minute}
                    onClick={() => handleTimeChange('minute', minute.toString())}
                    size='icon'
                    variant={field.value && field.value.getMinutes() === minute ? 'default' : 'ghost'}>
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar className='sm:hidden' orientation='horizontal' />
            </ScrollArea>
            <ScrollArea className=''>
              <div className='flex sm:flex-col p-2'>
                {getTimeType().map((ampm) => (
                  <Button
                    className='sm:w-full shrink-0 aspect-square'
                    key={ampm}
                    onClick={() => handleTimeChange('ampm', ampm)}
                    size='icon'
                    variant={
                      field.value &&
                      ((ampm === 'AM' && field.value.getHours() < 12) ||
                        (ampm === 'PM' && field.value.getHours() >= 12))
                        ? 'default'
                        : 'ghost'
                    }>
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
