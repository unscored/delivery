import { constants } from '../reducers/orders';
import { API, API_METHODS } from '../../constants';

import Http from '../../http';

const getOrders = () => dispatch => {
  dispatch({ type: constants.getOrdersStart });

  const body = {
    action: API.orders,
    method: API_METHODS.getOrders,
  };

  const onSuccess = result => {
    dispatch({ type: constants.getOrdersSuccess, payload: { result } });
  };
  const onError = (error) => {
    console.log(error);
    dispatch({ type: constants.getOrdersFail });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

const updateOrder = data => dispatch => {
  dispatch({ type: constants.updateOrderStart });

  const body = {
    action: API.orders,
    method: API_METHODS.updateOrder,
    data: [{ ...data }]
  };

  const onSuccess = result => {
    dispatch({ type: constants.updateOrderSuccess, payload: { ...data } });
  };
  const onError = (error) => {
    console.log(error);
    dispatch({ type: constants.updateOrderFail });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

export default {
  getOrders,
  updateOrder
}