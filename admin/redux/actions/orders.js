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

export default {
  getOrders,
}