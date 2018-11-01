import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import user from './user';
import orders from './orders';

const rootReducer = combineReducers({
  i18n,
  user,
  orders,
});

export default rootReducer;