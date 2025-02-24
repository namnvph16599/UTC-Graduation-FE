export const AppRouter = {
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
      list: '/admin/banners',
    },
    news: {
      list: '/admin/news',
    },
    contacts: {
      list: '/admin/contacts',
    },
  },
};
