'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppFilteringButtonActions } from '@/components/app-filtering-button-actions';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const formSchema = z.object({
  search: z.string().optional(),
});

type Props = {
  onRemoveFilterAction: () => void;
  onFilterAction: (values: z.infer<typeof formSchema>) => void;
};

const formId = 'service-filter-form';

export const ServiceFormFilter = ({ onFilterAction, onRemoveFilterAction }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <div className='bg-white p-5 rounded mb-6'>
      <Form {...form}>
        <form className='flex justify-between items-center' id={formId} onSubmit={form.handleSubmit(onFilterAction)}>
          <div className='flex justify-between items-center gap-3'>
            <FormField
              control={form.control}
              name='search'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='min-w-[300px] h-9'
                      placeholder='Tìm kiếm theo tên dịch vụ'
                      {...field}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          form.handleSubmit(onFilterAction)();
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <AppFilteringButtonActions form={form} formId={formId} onRemoveFilterAction={onRemoveFilterAction} />
        </form>
      </Form>
    </div>
  );
};
