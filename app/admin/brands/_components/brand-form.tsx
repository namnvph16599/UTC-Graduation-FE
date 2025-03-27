'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loading } from '@/components/app-loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBrandQuery } from '@/src/graphql/queries/brand.generated';
import { useModelsQuery } from '@/src/graphql/queries/models.generated';

const modelSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      message: 'Tên loại xe là trường bắt buộc',
    })
    .min(1, {
      message: 'Tên loại xe là trường bắt buộc',
    }),
});
const formSchema = z.object({
  name: z
    .string({
      message: 'Tên thương hiệu là trường bắt buộc',
    })
    .min(1, {
      message: 'Tên thương hiệu là trường bắt buộc',
    }),
  models: z.array(modelSchema).refine((values) => values.length > 0, {
    message: 'Loại xe là trường bắt buộc',
  }),
});

export const BrandForm = ({ id }: { id: string }) => {
  const router = useRouter();

  const { loading } = useBrandQuery({
    variables: {
      id,
    },
    onCompleted(brandData) {
      form.setValue('name', brandData.brand.name);
    },
  });

  const { loading: loadingModels } = useModelsQuery({
    variables: {
      args: {
        brand_id: id,
      },
    },
    onCompleted(modelsData) {
      if (modelsData?.models && modelsData?.models?.length > 0) {
        for (let idx = 0; idx < modelsData?.models.length; idx++) {
          const model = modelsData?.models[idx];
          append({
            id: model?.id,
            name: model?.name ?? '',
          });
        }
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'models',
    keyName: 'tempId',
  });
  const watchFieldArray = form.watch('models');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    console.log('data', data);
  }, []);

  useEffect(() => {
    if (controlledFields?.length <= 0 && !id) {
      append({
        id: '',
        name: '',
      });
    }
  }, [append, controlledFields?.length, id]);

  return (
    <Loading loading={loading || loadingModels}>
      <div className='p-5 bg-[#F9F9F9]'>
        <div className='p-5 bg-white mb-[93px] max-w-[600px] mx-auto'>
          <Form {...form}>
            <form
              className='grid grid-cols-1 items-start gap-6'
              id='repair-form'
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên thương hiệu</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập tên thương hiệu' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Loại xe</FormLabel>
              <div className='grid grid-cols-1 gap-2'>
                {controlledFields.map((field, index) => {
                  return (
                    <div className='flex items-center gap-3' key={field.tempId}>
                      <FormField
                        control={form.control}
                        name={`models.${index}.id`}
                        render={({ field }) => (
                          <FormItem className='hidden'>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`models.${index}.name`}
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormControl>
                              <Input placeholder='Nhập tên loại xe' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CircleX
                        className={cn({
                          'hover:cursor-pointer': controlledFields?.length > 1,
                          'hover:cursor-not-allowed': controlledFields?.length <= 1,
                        })}
                        color='rgb(32,44,56)'
                        onClick={() => {
                          if (controlledFields?.length < 1) return;
                          remove(index);
                        }}
                      />
                    </div>
                  );
                })}
                <div className='flex justify-end'>
                  <Button
                    onClick={() =>
                      append({
                        id: '',
                        name: '',
                      })
                    }
                    size={'md'}
                    type='button'>
                    Thêm loại xe
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className='fixed left-0 right-0 bottom-0 flex items-center justify-end gap-4 px-6 py-3 border-t border-[#eee] bg-white'>
        <Button onClick={() => router.back()} variant='outline'>
          Hủy
        </Button>
        <Button form='repair-form'>Thêm mới</Button>
      </div>
    </Loading>
  );
};
