export const AppRouter = {
  admin: {
    dashboard: '/admin/dashboard',
    repairs: {
      list: '/admin/repairs',
      add: '/admin/repairs/add',
    },
    products: {
      list: '/admin/products',
    },
    services: {
      list: '/admin/services',
      add: '/admin/services/add',
      edit: (id: string) => '/admin/services/' + id,
    },
    brands: {
      list: '/admin/brands',
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
