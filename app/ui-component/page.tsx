'use client';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RepairInvoice } from '../admin/repairs/add/_components/repair-invoice';

const Page = () => {
  return (
    <div>
      <RepairInvoice />
    </div>
  );
};

export default Page;
