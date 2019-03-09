import { constants } from '../reducers/products';
import { API, API_METHODS } from '../../constants';

import Http from '../../http';

const getProducts = () => dispatch => {
  dispatch({ type: constants.getProductsStart });

  const body = {
    action: API.products,
    method: API_METHODS.getProducts,
  };

  const onSuccess = result => {
    dispatch({ type: constants.getProductsSuccess, payload: { result } });
  };
  const onError = (error) => {
    console.log(error);
    dispatch({ type: constants.getProductsFail });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

export default {
  getProducts,
}