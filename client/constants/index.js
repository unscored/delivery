import { guid } from '../utils';

export const BASE_URL = 'http://95.46.44.56:3003/api';

export const API = {
  products: 'products',
  orders: 'orders',
};

export const API_METHODS = {
  getProducts: 'getProducts',
  addOrder: 'addOrder',
}

export const ROUTES_MAP = {
  main: '/',
  contacts: '/contacts',
  cart: '/cart',
};

export const MENU = [
  { id: guid(), name: 'main', path: ROUTES_MAP.main },
  { id: guid(), name: 'contacts', path: ROUTES_MAP.contacts },
  { id: guid(), name: 'cart', path: ROUTES_MAP.cart },
];

// modals
export const SUCCESS_PUSH_ORDER_MODAL = "SUCCESS_PUSH_ORDER_MODAL";