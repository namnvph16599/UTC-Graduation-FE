import { PropsWithChildren } from 'react';
import { cn } from '@/src/constants/utils';

type Props = { className?: string; loading: boolean } & PropsWithChildren;

export const Loading = ({ className, children, loading }: Props) => {
  return (
    <div
      className={cn(
        'relative',
        {
          'opacity-50': loading,
        },
        className,
      )}>
      {loading && (
        <div className='z-10 absolute inset-1/2 w-12 h-12 border-4 border-primary-default border-t-transparent rounded-full animate-spin' />
      )}
      {children}
    </div>
  );
};
