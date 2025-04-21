'use client';
import { RepairEntity } from '@/src/graphql/type.interface';

type Props = {
  repair?: RepairEntity;
};

export const RepairReview = ({ repair }: Props) => {
  return (
    <div className='p-5 bg-[#F9F9F9]'>
      <div className='p-5 bg-white'>
        {!repair?.review ? (
          'Khách hàng vẫn chưa đánh giá YCSC!'
        ) : (
          <>
            <h4 className='font-semibold'>
              {repair?.name}({repair?.phone})
            </h4>
            <p>{repair?.review}</p>
          </>
        )}
      </div>
    </div>
  );
};
