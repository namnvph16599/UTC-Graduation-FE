import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppFilteringButtonActions } from '@/components/app-filtering-button-actions';
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

          <AppFilteringButtonActions form={form} formId={repairFilterFormId} onRemoveFilterAction={onRemoveFilter} />
        </form>
      </Form>
    </div>
  );
};
