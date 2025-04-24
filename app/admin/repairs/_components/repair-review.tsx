'use client';
import dayjs from 'dayjs';
import RatingStar from '@/components/ui/rating';
import { DATE_FORMAT } from '@/src/constants/constant';
import { RepairEntity } from '@/src/graphql/type.interface';

type Props = {
  repair: RepairEntity;
};

export const RepairReview = ({ repair }: Props) => {
  return (
    <div className='p-5 bg-[#F9F9F9]'>
      <div className='p-5 bg-white'>
        {!repair?.review ? (
          'Khách hàng vẫn chưa đánh giá YCSC!'
        ) : (
          <section className=''>
            <div className=''>
              <div className='flex gap-5'>
                <div className='shrink-0'>
                  <p className='text-base font-semibold text-gray-900 dark:text-white'>{repair?.name}</p>
                  <p className='text-base font-semibold text-gray-900 dark:text-white'>{repair?.phone}</p>
                </div>

                <div className='min-w-0 flex-1'>
                  <RatingStar initialRating={repair?.review?.rating} />
                  <p className='text-base font-normal text-gray-500 dark:text-gray-400'>{repair?.review?.content}</p>
                </div>
              </div>
              <div className='flex justify-end text-sm text-gray-500'>
                {dayjs(repair?.review?.createdAt).format(DATE_FORMAT.dateTime)}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
