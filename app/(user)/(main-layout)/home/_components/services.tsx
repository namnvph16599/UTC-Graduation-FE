import { Cable, CircleCheck, Orbit, PaintBucket } from 'lucide-react';
import React from 'react';

const instructions = [
  {
    icon: <CircleCheck color='#ffc42c' />,
    label: 'Bảo dưỡng định kỳ',
    desc: 'Kiểm tra và bảo dưỡng xe máy theo khuyến nghị của nhà sản xuất để đảm bảo an toàn và hiệu suất vận hành.',
  },
  {
    icon: <Orbit color='#ffc42c' />,
    label: 'Sửa chữa động cơ',
    desc: 'Chẩn đoán và khắc phục các sự cố liên quan đến động cơ, giúp xe vận hành mượt mà hơn.',
  },
  {
    icon: <Cable color='#ffc42c' />,
    label: 'Thay thế phụ tùng',
    desc: 'Cung cấp và lắp đặt phụ tùng chính hãng, đảm bảo chất lượng và độ bền cho xe máy.',
  },
  {
    icon: <PaintBucket color='#ffc42c' />,
    label: 'Sơn - Tân trang xe',
    desc: 'Dịch vụ sơn mới, đánh bóng, dán keo bảo vệ giúp xe luôn như mới.',
  },
];

export const Services = () => {
  return (
    <div className='container mx-auto grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-10'>
      {instructions.map((item) => (
        <div className='flex flex-col gap-4 p-6 border border-[#EEEEEE] rounded-md' key={item.label}>
          <div className='flex flex-col gap-3'>
            <span>{item.icon}</span>
            <span className='text-primary-default font-semibold text-[20px] leading-[30px]'>{item.label}</span>
          </div>
          <span className='text-secondary-default'>{item.desc}</span>
        </div>
      ))}
    </div>
  );
};
