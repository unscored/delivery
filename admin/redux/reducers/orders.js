import { cloneDeep } from 'lodash';

export const constants = {
  getOrdersStart: 'GET_ORDERS_START',
  getOrdersSuccess: 'GET_ORDERS_SUCCESS',
  getOrdersFail: 'GET_ORDERS_FAIL',
  updateOrderStart: 'UPDATE_ORDER_START',
  updateOrderSuccess: 'UPDATE_ORDER_SUCCESS',
  updateOrderFail: 'UPDATE_ORDER_FAIL',
};

const model = {
  fetched: false,
  fetching: false,
  items: [],
  error: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.updateOrderStart: 
    case constants.getOrdersStart: {
      return { ...state, fetching: true };
    }

    case constants.getOrdersSuccess: {
      const { payload } = action;
      return { ...state, fetching: false, fetched: true, items: payload.result };
    }

    case constants.updateOrderSuccess: {
      const { payload } = action;
      const index = state.items.findIndex(item => item.id === payload.id);
      const newItems = cloneDeep(state.items);
      
      if (index >= 0) {
        newItems.splice(index, 1, payload);
      }
      
      return { ...state, fetching: false, fetched: true, items: newItems };
    }

    case constants.getOrdersFail: {
      const { payload } = action;
      return { ...state, fetching: false, error: payload, fetched: false };
    }

    default:
    return state;
  }
}