import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import user from './user';

const rootReducer = combineReducers({
  i18n,
  user,
});

export default rootReducer;