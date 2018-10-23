import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import { loadState } from '../modules/LocalStorage';
import { localStorageMiddleware } from './middlewares/localStorageMiddleware';
import translations from '../dictionary';
import Reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const middleware = applyMiddleware(thunk, localStorageMiddleware);
const composer = composeEnhancers(middleware);
const store = createStore(Reducers, persistedState, composer);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('ru'));

export default store;