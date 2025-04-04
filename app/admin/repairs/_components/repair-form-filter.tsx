import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RepairStatusEnum } from '@/src/graphql/type.interface';
import { convertRepairStatusEnum } from '@/src/utils/convert-enum.util';

export const filterRepairSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
});

type Props = {
  onRefresh: () => void;
  onRemoveFilter: () => void;
  onFilter: (values: z.infer<typeof filterRepairSchema>) => void;
};

export const RepairFormFilter = ({ onFilter, onRefresh, onRemoveFilter }: Props) => {
  const form = useForm<z.infer<typeof filterRepairSchema>>({
    resolver: zodResolver(filterRepairSchema),
    defaultValues: {},
  });

  return (
    <div className='bg-white p-5 rounded mb-6'>
      <Form {...form}>
        <form className='flex justify-between items-center' onSubmit={form.handleSubmit(onFilter)}>
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
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
            />
          </div>

          <div className='flex justify-between items-center gap-3'>
            <Button onClick={() => onRefresh()} size={'md'}>
              Làm mới
            </Button>
            <Button
              onClick={() => {
                form.reset();
                form.setValue('search', '');
                onRemoveFilter();
              }}
              size={'md'}>
              Xóa lọc
            </Button>
            <Button size={'md'} type='submit'>
              Lọc
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
