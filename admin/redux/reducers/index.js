import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import user from './user';
import orders from './orders';
import clients from './clients';
import products from './products';
import forms from './forms';
import sider from './sider';

const rootReducer = combineReducers({
  i18n,
  user,
  forms,
  orders,
  clients,
  products,
  sider,
});

export default rootReducer;