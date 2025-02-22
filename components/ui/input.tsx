import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676773] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

const InputFormatter = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    formatValue: (value: string) => string;
    unFormatValue: (value: string) => string;
  }
>(({ className, type, formatValue, unFormatValue, ...props }, ref) => {
  const formattedValue = formatValue(props.value ? props.value.toString() : '');

  return (
    <input
      className={cn(
        'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676773] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
      onChange={(e) => {
        e.currentTarget.value = unFormatValue(e.currentTarget.value);
        props.onChange?.(e);
      }}
      value={formattedValue}
    />
  );
});
InputFormatter.displayName = 'InputFormatter';

export { InputFormatter };
