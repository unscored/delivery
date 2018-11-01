

export const constants = {
  getOrdersStart: 'GET_ORDERS_START',
  getOrdersSuccess: 'GET_ORDERS_SUCCESS',
  getOrdersFail: 'GET_ORDERS_FAIL',
};

const model = {
  fetched: false,
  fetching: false,
  items: [],
  error: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.getOrdersStart: {
      return { ...state, fetching: true };
    }

    case constants.getOrdersSuccess: {
      const { payload } = action;
      return { ...state, fetching: false, fetched: true, items: payload.result };
    }

    case constants.getOrdersFail: {
      const { payload } = action;
      return { ...state, fetching: false, error: payload, fetched: false, items: [] };
    }

    default:
    return state;
  }
}