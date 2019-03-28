import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import products from './products';
import menu from './menu';
import cart, * as fromCart from './cart';
import user, * as fromUser from './user';
import selectedItems from './selectedItems';
import popUp from './popUp';

const rootReducer = combineReducers({
  products,
  menu,
  cart,
  user,
  selectedItems,
  i18n,
  popUp,
});

export default rootReducer;

export const isFormDataValid = state => fromUser.isFormDataValid(state.user);

export const getTotalPrice = state => fromCart.getTotalPrice(state.cart);