import { map } from 'lodash'; 
import { cl } from '../../utils';

const model = {
  items: [],
};
export const constants = {
  getProducts: 'GET_PRODUCTS',
  getProductsSuccess: 'GET_PRODUCTS_SUCCESS',
  getProductsFail: 'GET_PRODUCTS_FAIL',
};

export default function (state = model, action) {
  const { type } = action;

  switch (type) {
    case constants.getProductsSuccess: {
      const { payload: { result } } = action;
      const items = map(result, item => ({
        ...item,
        image: cl.url(item.id, { version: item.image, sign_url: true })
      }));

      return { ...state, items };
    }
    default:
      return { ...state }
  }
};
