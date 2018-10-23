import { toast } from "react-toastify";
import { I18n } from 'react-redux-i18n';

import Http from '../../http';
import { API, API_METHODS } from '../../constants';
import { constants } from '../reducers/cart';

const hide = () => ({ type: constants.hide });
const show = () => ({ type: constants.show });
const toggle = () => ({ type: constants.toggle });

const changeQuantity = (mode, id, value) => ({ type: constants.changeQuantity, payload: { mode, id, value } });

const pushOrder = (items, userInfo) => dispatch => {
  dispatch({type: constants.pushOrder});

  const { name, phone, address } = userInfo;
  const data = [{
    name,
    address,
    phone,
    items,
  }];
  const body = {
    action: API.orders,
    method: API_METHODS.addOrder,
    data,
  };

  const onSuccess = () => {
    dispatch({ type: constants.pushOrderSuccess });
  };
  const onError = error => {
    console.log(error);
    dispatch({ type: constants.pushOrderFail });
  };

  return Http.post(body).then(onSuccess).catch(onError);
}

const addToCart = item  => {
  toast.info(I18n.t('addedToCart'));
  return { type: constants.add, payload: { item }};
};

const deleteFromCart = id => ({ type: constants.remove, payload: { id }});

const clearCart = () => ({ type: constants.clear });

export default {
  toggle,
  show,
  hide,
  addToCart,
  deleteFromCart,
  changeQuantity,
  pushOrder,
  clearCart,
};