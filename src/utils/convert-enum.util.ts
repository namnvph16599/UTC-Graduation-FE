import { RepairStatusEnum, UserStatus } from '@/src/graphql/type.interface';

export const convertRepairStatusEnum = (status: RepairStatusEnum) => {
  switch (status) {
    case RepairStatusEnum.CANCELLED:
      return 'Hủy';
    case RepairStatusEnum.CONFIRMED:
      return 'Đã xác nhận';
    case RepairStatusEnum.FINISHED:
      return 'Hoàn thành';
    case RepairStatusEnum.HANDLING:
      return 'Đang xử lý';
    case RepairStatusEnum.WAITING_FOR_CONFIRM:
      return 'Đợi xác nhận';
    case RepairStatusEnum.WAITING_FOR_PAYMENT:
      return 'Chờ thanh toán';
    default:
      return '';
  }
};

export const convertUserStatus = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Đang kích họat';
    case UserStatus.INACTIVE:
      return 'Vô hiệu hóa';
    case UserStatus.VERIFYNEEDED:
      return 'Cần xác thực';
    default:
      return '';
  }
};
