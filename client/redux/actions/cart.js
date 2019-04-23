import { toast } from "react-toastify";
import { I18n } from 'react-redux-i18n';
import _ from 'lodash';

import Http from '../../http';
import popUpActions from './popUp';
import userActions from './user';
import { API, API_METHODS, INFO_POP_UP, ROUTES_MAP } from '../../constants';
import { constants } from '../reducers/cart';

const hide = () => ({ type: constants.hide });
const show = () => ({ type: constants.show });
const toggle = () => ({ type: constants.toggle });

const changeQuantity = (mode, id, value) => ({ type: constants.changeQuantity, payload: { mode, id, value } });

const pushOrder = (items, userInfo, historyPush = null) => dispatch => {
  dispatch({type: constants.pushOrder});

  const { name, phone, address } = userInfo;
  const handleOkClick = () => {
    dispatch(popUpActions.setPopUp(null));
    dispatch(clearCart());
    dispatch(userActions.clearUserInfo());

    if (historyPush) {
      historyPush(ROUTES_MAP.main);
    }
  };
  
  const body = {
    action: API.orders,
    method: API_METHODS.addOrder,
    data: [{ name, address, phone, items: _.omit(items, ['cartId', 'selectedPropsID', 'image']) }],
  };

  const onSuccess = () => {
    dispatch({ type: constants.pushOrderSuccess });
    dispatch(popUpActions.setPopUp(
      INFO_POP_UP, 
      {
        title: I18n.t('successOrderModalTitle'),
        content: I18n.t('successOrderModalText'),
        handleOkClick
      }
    ));
  };
  const onError = error => {
    console.log(error);
    dispatch({ type: constants.pushOrderFail });
    dispatch(popUpActions.setPopUp(
      INFO_POP_UP,
      {
        title: I18n.t('failOrderModalTitle'),
        content: I18n.t('failOrderModalText'),
        handleOkClick
      }
    ));
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