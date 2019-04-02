export const ROUTES_MAP = {
  default: '/',
  main: '/admin',
  login: `/admin/login`,
  clients: `/admin/clients`,
  orders: `/admin/orders`,
  products: `/admin/products`,
};

export const BASE_URL = $__WebPackConfig.API_URL;

export const API = {
  orders: 'orders',
  products: 'products',
  users: 'users',
  clients: 'clients',
};

export const hideArray = [
  ROUTES_MAP.login,
];

export const API_METHODS = {
  getOrders: 'getOrders',
  updateOrder: 'updateOrder',
  getClients: 'getClients',
  getProducts: 'getProducts',
  login: 'login',
};

export const STATUS_TYPE = {
  new: 0,
  processing: 1,
  ready: 2,
  closed: 3,
  rejected: 4,
  returned: 5
};

// forms 
export const ROOT_FORM = 'forms';