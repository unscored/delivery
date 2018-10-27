import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import translations from '../dictionary';
import Reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk);
const composer = composeEnhancers(middleware);
const store = createStore(Reducers, undefined, composer);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('ru'));

export default store;