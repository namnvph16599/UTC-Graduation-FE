export const AppRouter = {
  auth: {
    login: '/dang-nhap',
    register: '/dang-ky',
  },
  user: {
    home: '/trang-chu',
    about: '/gioi-thieu',
    booking: '/dat-lich',
    news: '/tin-tuc-va-cam-nang',
    contact: '/lien-he',
    authenticatePages: {
      myVehicle: {
        label: 'Xe của tôi',
        path: '/xe-cua-toi',
        edit: (id: string) => '/xe-cua-toi/' + id,
        add: '/xe-cua-toi/tao-moi',
      },
      changePassword: '/thay-doi-mat-khau',
      repairRequest: {
        label: 'Yêu cầu sửa chữa',
        path: '/yeu-cau-sua-chua',
        detail: (id: string) => '/yeu-cau-sua-chua/' + id,
      },
    },
  },
  admin: {
    dashboard: '/admin/dashboard',
    revenue: {
      label: 'Thống kê',
      path: '/admin/revenue',
    },
    repairs: {
      list: '/admin/repairs',
      add: '/admin/repairs/add',
      edit: (id: string) => '/admin/repairs/' + id,
    },
    products: {
      list: '/admin/products',
      add: '/admin/products/add',
      edit: (id: string) => '/admin/products/' + id,
    },
    services: {
      list: '/admin/services',
      add: '/admin/services/add',
      edit: (id: string) => '/admin/services/' + id,
    },
    brands: {
      label: 'Thương hiệu và sản phẩm',
      list: '/admin/brands',
      add: '/admin/brands/add',
      edit: (id: string) => '/admin/brands/' + id,
    },
    banners: {
      label: 'Banners',
      list: '/admin/banners',
      add: '/admin/banners/add',
      edit: (id: string) => '/admin/banners/' + id,
    },
    news: {
      label: 'Tin tức',
      list: '/admin/news',
      add: '/admin/news/add',
      edit: (id: string) => '/admin/news/' + id,
    },
    contacts: {
      label: 'Liên hệ',
      list: '/admin/contacts',
      add: '/admin/contacts/add',
      edit: (id: string) => '/admin/contacts/' + id,
    },
    staff: {
      label: 'Nhân viên',
      list: '/admin/staffs',
      add: '/admin/staffs/add',
      edit: (id: string) => '/admin/staffs/' + id,
    },
  },
};

export const AppInformation = {
  name: 'suachua24h',
  address: '27, ngõ 262B, Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội',
  email: 'nvnam042@gmail.com',
  hotline1: '09xx.xxx.xxx',
  hotline2: '024.xxxx.xxxx',
};

export const DATE_FORMAT = {
  date: 'DD-MM-YYYY',
  dateTime: 'HH:mm DD-MM-YYYY',
  monthAndYear: 'MM-YYYY',
  dob: 'DD/MM/YYYY',
  server: 'YYYY-MM-DD',
  fulltime: 'DD/MM/YYYY HH:mm:ss',
  time: 'HH:mm:ss',
};

export const validationMessages = {
  required: 'Đây là trường bắt buộc',
  passwordMatch: 'Mật khẩu mới phải khớp với mật khẩu cũ',
  emailOrPhoneIsWrong: 'Email hoặc số điện thoại không đúng định dạng',
  startYearInvalid: 'Năm và tháng bắt đầu cần phải nhỏ hơn năm và tháng kết thúc',
  requiredSelectMerchant: 'Vui lòng chọn nhà cung cấp',
  minSixCharacters: 'Vui lòng nhập tối thiểu 6 ký tự',
  invalidFile: 'File không hợp lệ',
  invalidEmail: 'Email không đúng định dạng',
  invalidPhone: 'Số điện thoại không đúng định dạng',
  oneSpecialCharacters: 'Tối thiểu 1 ký tự đặc biệt',
  minAuditPeriod: 'Thời gian kiểm toán tối thiểu là 3 tháng',
  minPoint: 'Số điểm ít nhất là 1',
  maxLength: (v: number) => `Vui lòng nhập tối đa ${v} ký tự`,
  minLength: (v: number) => `Vui lòng nhập tối thiểu ${v} ký tự`,
  equalLength: (v: number) => `Trường này bắt buộc ${v} ký tự`,
};
