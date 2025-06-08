'use client';
import { UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';

type Props = {
  formId: string;
  onRemoveFilterAction: () => void;
  form: UseFormReturn;
};

export const AppFilteringButtonActions = ({ formId, onRemoveFilterAction, form }: Props) => {
  return (
    <div className='flex justify-between items-center gap-3'>
      <Button
        onClick={() => {
          form.reset();
          form.setValue('search', '');
          onRemoveFilterAction();
        }}
        size={'md'}
        variant={'outline'}>
        Xóa lọc
      </Button>
      <Button form={formId} size={'md'} type='submit'>
        Lọc
      </Button>
    </div>
  );
};
