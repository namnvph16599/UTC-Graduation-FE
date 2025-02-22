'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const Combobox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    options: { label: string; value: string }[];
    placeholderSearch?: string;
    placeholderSelect?: string;
    onChange: (newValue: string) => void;
  }
  // >(({ options, placeholderSearch, placeholderSelect, value, onChange, className, ...props }, ref) => {
>(({ options, placeholderSearch, placeholderSelect, value, onChange, className }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn(className)}>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className={cn('w-full justify-between font-normal', {
              'text-[#262626]': !!value,
              'text-[#676773]': !value,
            })}
            role='combobox'
            variant='normalOutline'>
            {value
              ? options.find((framework) => framework.value === value)?.label
              : (placeholderSelect ?? 'Chọn giá trị')}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
          <Command>
            <CommandInput className='h-9' placeholder={placeholderSearch ?? 'Tìm kiếm'} />
            <CommandList className='w-full'>
              <CommandEmpty>Không có dữ liệu.</CommandEmpty>
              <CommandGroup>
                {options.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      onChange?.(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    value={framework.value}>
                    {framework.label}
                    <Check className={cn('ml-auto', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
                {!!value && (
                  <CommandItem
                    className='border-t'
                    key={'remove'}
                    onSelect={() => {
                      onChange?.('');
                      setOpen(false);
                    }}>
                    Xóa
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});

Combobox.displayName = 'Combobox';

export { Combobox };
