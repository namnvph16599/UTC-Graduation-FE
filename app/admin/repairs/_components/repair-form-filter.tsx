'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppFilteringButtonActions } from '@/components/app-filtering-button-actions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/src/constants/utils';

export const filterRepairSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  createdAt: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
});

type Props = {
  onRemoveFilter: () => void;
  onFilter: (values: z.infer<typeof filterRepairSchema>) => void;
};

const repairFilterFormId = 'repair-filter-form';

export const RepairFormFilter = ({ onFilter, onRemoveFilter }: Props) => {
  const form = useForm<z.infer<typeof filterRepairSchema>>({
    resolver: zodResolver(filterRepairSchema),
    defaultValues: {},
  });

  return (
    <div className='bg-white p-5 rounded mb-6'>
      <Form {...form}>
        <form
          className='flex justify-between items-center'
          id={repairFilterFormId}
          onSubmit={form.handleSubmit(onFilter)}>
          <div className='flex justify-between items-center gap-3'>
            <FormField
              control={form.control}
              name='search'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='min-w-[300px] h-9'
                      placeholder='Tìm kiếm theo tên, sđt, biển kiểm soát'
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          form.handleSubmit(onFilter)();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='createdAt'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                            size={'md'}
                            variant='outline'>
                            {field.value?.from ? (
                              <>
                                {format(field.value.from, 'dd/MM/yyyy')} -{' '}
                                {field.value.to ? format(field.value.to, 'dd/MM/yyyy') : ''}
                              </>
                            ) : (
                              <span>Thời gian tạo</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className='w-auto p-0'>
                        <Calendar mode='range' onSelect={field.onChange} selected={field.value} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      className='block min-w-[220px]'
                      {...field}
                      buttonSize={'md'}
                      onChange={(val) => field.onChange(val)}
                      options={Object.values(RepairStatusEnum).map((v) => ({
                        label: convertRepairStatusEnum(v),
                        value: v,
                      }))}
                      placeholderSelect='Trạng thái'
                      searchable={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>

          <AppFilteringButtonActions form={form} formId={repairFilterFormId} onRemoveFilterAction={onRemoveFilter} />
        </form>
      </Form>
    </div>
  );
};
