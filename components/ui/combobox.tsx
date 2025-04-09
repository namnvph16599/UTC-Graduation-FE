'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/src/constants/utils';

const Combobox = ({
  options,
  placeholderSearch,
  placeholderSelect,
  value,
  onChange,
  className,
  allowAddingValueSearch,
  removable = true,
  searchable = true,
  buttonSize = 'default',
  disabled,
}: React.ComponentProps<'input'> & {
  options: { label: string; value: string; disable?: boolean }[];
  placeholderSearch?: string;
  placeholderSelect?: string;
  onChange: (newValue: string) => void;
  allowAddingValueSearch?: boolean;
  removable?: boolean;
  searchable?: boolean;
  buttonSize?: 'default' | 'sm' | 'md' | 'lg' | null | undefined;
}) => {
  const [open, setOpen] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState('');

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
            disabled={disabled}
            role='combobox'
            size={buttonSize}
            variant='normalOutline'>
            {value
              ? (options.find((framework) => framework.value === value)?.label ?? value)
              : (placeholderSelect ?? 'Chọn giá trị')}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
          <Command>
            {!!searchable && (
              <CommandInput
                className='h-9'
                onValueChange={setSearchValue}
                placeholder={placeholderSearch ?? 'Tìm kiếm'}
                value={searchValue}
              />
            )}
            <CommandList className='w-full'>
              <CommandEmpty>Không có dữ liệu.</CommandEmpty>
              <CommandGroup>
                {options.map((framework) => (
                  <CommandItem
                    className={cn({
                      'cursor-not-allowed': !!framework.disable,
                    })}
                    key={framework.value}
                    onSelect={(currentValue) => {
                      if (framework.disable === true) return;
                      onChange?.(currentValue === value && !!removable ? '' : currentValue);
                      setOpen(false);
                    }}
                    value={framework.value}>
                    {framework.label}
                    <Check className={cn('ml-auto', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
                {allowAddingValueSearch && (
                  <CommandItem
                    key={searchValue}
                    onSelect={() => {
                      onChange?.(searchValue);
                      setOpen(false);
                    }}
                    value={searchValue}>
                    {searchValue}
                    <Check className={cn('ml-auto', value === searchValue ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                )}
                {!!value && removable && (
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
};

Combobox.displayName = 'Combobox';
export { Combobox };
