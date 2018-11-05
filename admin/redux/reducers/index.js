import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import user from './user';
import orders from './orders';
import sider from './sider';

const rootReducer = combineReducers({
  i18n,
  user,
  orders,
  sider,
});

export default rootReducer;