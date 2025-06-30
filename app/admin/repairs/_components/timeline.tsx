'use client';
import dayjs from 'dayjs';
import { ChevronsRight } from 'lucide-react';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DATE_FORMAT } from '@/src/constants/constant';
import { RepairEntity } from '@/src/graphql/type.interface';
import RepairRequestStatus from './repair-request-status';

const Timeline = ({ repair }: { repair: RepairEntity }) => {
  const statuses = React.useMemo(() => repair?.statusHistories ?? [], [repair?.statusHistories]);

  return (
    <section className='bg-white p-5'>
      <div className='container'>
        <h1 className='text-xl font-bold mb-5'>Lịch sử thay đổi trạng thái</h1>
        <div className='relative mx-auto max-w-4xl'>
          <Separator className='bg-muted absolute left-2 top-4' orientation='vertical' />
          {statuses.map((entry, index) => (
            <div className='relative mb-6 pl-8' key={index}>
              <div className='bg-primary-default absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full' />
              <Card className='border-none shadow-none'>
                <CardContent className='p-0'>
                  <p className='text-sm font-medium'> {dayjs(entry.createdAt).format(DATE_FORMAT.dateTime)}</p>
                  <div className='mt-2 flex items-center justify-start'>
                    <RepairRequestStatus status={entry.oldStatus} />
                    <ChevronsRight size={14} />
                    <RepairRequestStatus status={entry.newStatus} />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Timeline };
