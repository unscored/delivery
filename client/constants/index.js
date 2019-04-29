import { guid } from '../utils';

export const BASE_URL = $__WebPackConfig.API_URL;

console.log(BASE_URL);

export const INSTA_URL = 'https://www.instagram.com/cafe_belvedere/';
export const CONTACT_PHONE = '+38 063 37 32 915';
export const CONTACT_CITY = 'г. Черноморск';
export const ADDRESS_STRING = 'ул. 1 Мая 6г, кафе \"Belvedere\"';
export const WORK_HOURS = '11:00 - 23:00';
export const DAYS_OFF = 'Без выходных';

export const IS_DEV = process.env.NODE_ENV === 'development';

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