import { cloneDeep, omit } from 'lodash';

export const constants = {
  getProductsStart: 'GET_PRODUCTS_START',
  getProductsSuccess: 'GET_PRODUCTS_SUCCESS',
  getProductsFail: 'GET_PRODUCTS_FAIL',
  updateProductStart: 'UPDATE_PRODUCT_START',
  updateProductSuccess: 'UPDATE_PRODUCT_SUCCESS',
  updateProductFail: 'UPDATE_PRODUCT_FAIL',
};

const model = {
  fetched: false,
  fetching: false,
  items: [],
  error: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.updateProductStart:
    case constants.getProductsStart: {
      return { ...state, fetching: true };
    }

    case constants.getProductsSuccess: {
      const { payload } = action;

      return { ...state, fetching: false, fetched: true, items: payload.result };
    }

    case constants.updateProductSuccess: {
      const { payload } = action;
      const index = state.items.findIndex(item => item.id === payload.id);
      const newItems = cloneDeep(state.items);
      
      if (index >= 0) {
        newItems.splice(index, 1, payload);
      }
      return { ...state, fetching: false, fetched: true, items: newItems };
    }

    case constants.updateProductFail:
    case constants.getProductsFail: {
      const { payload } = action;
      return { ...state, fetching: false, error: payload, fetched: false };
    }

    default:
    return state;
  }
}