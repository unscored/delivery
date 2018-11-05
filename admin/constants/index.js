export const ROUTES_MAP = {
  main: '/',
  login: '/login',
  clients: '/clients',
  orders: '/orders',
  products: '/products',
};

export const BASE_URL = $__WebPackConfig.API_URL;

export const API = {
  orders: 'orders',
  users: 'users',
};

export const hideArray = [
  ROUTES_MAP.login,
];

export const API_METHODS = {
  getOrders: 'getOrders',
  login: 'login',
}

export const STATUS_TYPE = {
  NEW: 0,
  PROCESSING: 1,
  READY: 2,
  PAID: 3,
  CLOSED: 4,
  REJECTED: 5,
  RETURNED: 6
}