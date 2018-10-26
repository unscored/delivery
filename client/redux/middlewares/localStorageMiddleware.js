import { saveState } from '../../modules/LocalStorage';
import { constants } from '../reducers/cart';

export const localStorageMiddleware = store => next => action => {
  const returnValue = next(action);

  const {
    add,
    remove,
    changeQuantity,
    setQuantity,
    clear,
   } = constants;
  const actions = [
    add,
    remove,
    changeQuantity,
    setQuantity,
    clear,
  ];

  if (actions.includes(action.type)) {
    saveState({ cart: { ...store.getState().cart, show: false }});
  }

  return returnValue;
};