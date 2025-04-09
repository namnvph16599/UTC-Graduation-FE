'use client';

import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/src/constants/utils';

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className='relative'>
        <input
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#676773] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
          type={!!show ? 'input' : 'password'}
        />
        {!show && (
          <Eye
            className='absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer'
            color='#e1e1e1'
            onClick={() => setShow(true)}
          />
        )}
        {!!show && (
          <EyeClosed
            className='absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer'
            color='#e1e1e1'
            onClick={() => setShow(false)}
          />
        )}
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
