import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ContactStatusEnum } from '@/src/graphql/type.interface';
import { convertContactStatusEnum } from '@/src/utils/convert-enum.util';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const filterContactSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
});

type Props = {
  onRefresh: () => void;
  onRemoveFilter: () => void;
  onFilter: (values: z.infer<typeof filterContactSchema>) => void;
};

export const ContactFormFilter = ({ onFilter, onRefresh, onRemoveFilter }: Props) => {
  const form = useForm<z.infer<typeof filterContactSchema>>({
    resolver: zodResolver(filterContactSchema),
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
                    <Input className='min-w-[300px] h-9' placeholder='Tìm kiếm theo tên, sđt khách hàng' {...field} />
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
                      options={Object.values(ContactStatusEnum).map((v) => ({
                        label: convertContactStatusEnum(v),
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
