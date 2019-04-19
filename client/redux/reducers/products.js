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

      return { ...state, items: result };
    }
    default:
      return { ...state }
  }
};
