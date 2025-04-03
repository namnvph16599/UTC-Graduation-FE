import { RepairStatusEnum } from '@/src/graphql/type.interface';
import { Count } from './_components/count';
import { RepairsByStatus } from './_components/repairs-by-status';

const Page = () => {
  return (
    <div className='bg-[#f9f9f9] p-5'>
      <div className='mb-8'>
        <Count />
      </div>
      <div className='mb-8'>
        <RepairsByStatus status={RepairStatusEnum.WAITING_FOR_CONFIRM} title='Yêu cầu sửa chữa chờ nhận' />
      </div>
      <div className='mb-8'>
        <RepairsByStatus status={RepairStatusEnum.CONFIRMED} title='Yêu cầu sửa chữa đã nhận' />
      </div>
    </div>
  );
};

export default Page;
