import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

export const filterReviewSchema = z.object({
  rating: z.string().optional(),
});

type Props = {
  onRemoveFilter: () => void;
  onFilter: (values: z.infer<typeof filterReviewSchema>) => void;
};

export const ReviewFormFilter = ({ onFilter, onRemoveFilter }: Props) => {
  const form = useForm<z.infer<typeof filterReviewSchema>>({
    resolver: zodResolver(filterReviewSchema),
    defaultValues: {},
  });

  return (
    <div className='bg-white p-5 rounded mb-6'>
      <Form {...form}>
        <form className='flex justify-between items-center' onSubmit={form.handleSubmit(onFilter)}>
          <div className='flex justify-between items-center gap-3'>
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      className='block min-w-[220px]'
                      {...field}
                      buttonSize={'md'}
                      onChange={(val) => field.onChange(val)}
                      options={[
                        { label: '1 sao', value: '1' },
                        { label: '2 sao', value: '2' },
                        { label: '3 sao', value: '3' },
                        { label: '4 sao', value: '4' },
                        { label: '5 sao', value: '5' },
                      ]}
                      placeholderSelect='Chọn sao'
                      removable={false}
                      searchable={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='flex justify-between items-center gap-3'>
            <Button
              onClick={() => {
                form.reset();
                form.setValue('rating', '');
                onRemoveFilter();
              }}
              size={'md'}
              variant={'outline'}>
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
