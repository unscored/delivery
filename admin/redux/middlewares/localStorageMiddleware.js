import { saveState } from '../../utils';
import { constants } from '../reducers/user';

export const localStorageMiddleware = store => next => action => {
  const returnValue = next(action);

  const {
    updateUser,
    loginStart,
    loginSuccess,
    loginFail,
    logout,
   } = constants;
  const actions = [
    updateUser,
    loginStart,
    loginSuccess,
    loginFail,
    logout,
  ];

  if (actions.includes(action.type)) {
    saveState({ user: store.getState().user });
  }

  return returnValue;
};