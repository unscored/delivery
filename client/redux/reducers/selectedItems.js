import { findIndex } from 'lodash';

const model = [];

export const constants = {
  setItem: 'SET_ACTIVE_PRODUCT_PROPERTY',
}

export default function (state = model, action) {
  const { type } = action;

  switch (type) {
    case constants.setItem: {
      const { payload } = action;
      const { id } = payload;
      const index = findIndex(state, o => o.id == id);

      if (index >= 0) state[index].data = { ...state[index].data, ...payload.data };
      else return [ ...state, { ...payload } ];

      return [...state];
    }
    default:
      return [ ...state ]
  }
};