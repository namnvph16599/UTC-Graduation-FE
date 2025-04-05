'use client';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div>
      <Button
        onClick={() => {
          toast.error('Cập nhật thành công!', {
            description: 'something somhti',
          });
        }}>
        Error
      </Button>
      <Button
        onClick={() => {
          toast.success('Cập nhật thành công!', {
            description: 'something somhti',
          });
        }}>
        success
      </Button>
      <Button
        onClick={() => {
          toast.warning('Cập nhật thành công!', {
            description: 'something somhti',
          });
        }}>
        warning
      </Button>
    </div>
  );
};

export default Page;
