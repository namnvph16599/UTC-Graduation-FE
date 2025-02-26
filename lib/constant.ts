export const AppRouter = {
  auth: {
    login: '/dang-nhap',
    register: '/dang-ky',
  },
  user: {
    home: '/',
    about: '/gioi-thieu',
    booking: '/dat-lich',
    news: '/tin-tuc',
    contact: '/lien-he',
  },
  admin: {
    dashboard: '/admin/dashboard',
    repairs: {
      list: '/admin/repairs',
      add: '/admin/repairs/add',
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
      list: '/admin/news',
    },
    contacts: {
      list: '/admin/contacts',
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
