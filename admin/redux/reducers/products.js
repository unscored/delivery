

export const constants = {
  getProductsStart: 'GET_PRODUCTS_START',
  getProductsSuccess: 'GET_PRODUCTS_SUCCESS',
  getProductsFail: 'GET_PRODUCTS_FAIL',
};

const model = {
  fetched: false,
  fetching: false,
  items: [],
  error: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.getProductsStart: {
      return { ...state, fetching: true };
    }

    case constants.getProductsSuccess: {
      const { payload } = action;
      return { ...state, fetching: false, fetched: true, items: payload.result };
    }

    case constants.getProductsFail: {
      const { payload } = action;
      return { ...state, fetching: false, error: payload, fetched: false, items: [] };
    }

    default:
    return state;
  }
}