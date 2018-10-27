import { i18nReducer as i18n } from 'react-redux-i18n';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  i18n,
});

export default rootReducer;