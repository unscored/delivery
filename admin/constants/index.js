export const ROUTES_MAP = {
  main: '/',
  login: '/login',
  clients: '/clients',
  orders: '/orders',
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