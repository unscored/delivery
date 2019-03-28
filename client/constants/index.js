import { guid } from '../utils';

export const BASE_URL = $__WebPackConfig.API_URL;

export const INSTA_URL = $__WebPackConfig.INSTA_URL;
export const CONTACT_PHONE = $__WebPackConfig.CONTACT_PHONE;
export const CONTACT_CITY = $__WebPackConfig.CONTACT_CITY;
export const ADDRESS_STRING = $__WebPackConfig.ADDRESS_STRING;

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

// pop up
export const INFO_POP_UP = "INFO_POP_UP";