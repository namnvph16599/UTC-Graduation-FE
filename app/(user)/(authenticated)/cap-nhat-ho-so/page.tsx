import { ChangePassword } from '@/app/(user)/(authenticated)/cap-nhat-ho-so/components/change-password';
import { UpdateInformation } from '@/app/(user)/(authenticated)/cap-nhat-ho-so/components/update-information';
import { AppBreadcrumb } from '@/components/app-breadcrumb';

const Page = () => {
  return (
    <div className='container mx-auto'>
      <AppBreadcrumb
        className='px-0 mb-4'
        isAdmin={false}
        isUser={true}
        items={[
          {
            label: 'Cập nhật hồ sơ',
            href: '#',
          },
        ]}
      />
      <div className='p-10 bg-[#f1f1f1] rounded-[32px] mb-8'>
        <h1 className='text-secondary-default font-semibold mb-4 text-xl'> Cập nhật thông tin</h1>
        <UpdateInformation />
      </div>
      <div className='p-10 bg-[#f1f1f1] rounded-[32px]'>
        <h1 className='text-secondary-default font-semibold mb-4 text-xl'> Thay đổi mật khẩu</h1>
        <ChangePassword />
      </div>
    </div>
  );
};

export default Page;
