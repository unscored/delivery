import {  findIndex, cloneDeep } from 'lodash';

export const constants = {
  add: 'ADD_ITEM_TO_CARD',
  remove: 'REMOVE_ITEM_FROM_CARD',
  clear: 'CLEAR_CARD',
  toggle: 'TOGGLE_CART',
  show: 'SHOW_CART',
  hide: 'HIDE_CART',
  changeQuantity: 'CHANGE_ITEM_QUANTITY',
  pushOrder: 'PUSH_ORDER',
  pushOrderSuccess: 'PUSH_ORDER_SUCCESS',
  pushOrderFail: 'PUSH_ORDER_FAIL',
};

export const MODE = {
  down: 'down',
  up: 'up',
};

const model = {
  fetching: false,
  items: [],
  show: false,
};

export default function (state = model, action) {
  switch (action.type) {
    case constants.toggle:
      return { ...state, show: !state.show };

    case constants.show:
      return { ...state, show: true };

    case constants.hide:
      return { ...state, show: false };
    
    case constants.clear:
      return { ...state, items: [] };

    case constants.changeQuantity:
      const { payload: { id, value, mode } } = action;
      const { items } = state;
      const newItems = cloneDeep(items);
      const targetItemIndex = findIndex(newItems, u => u.cartId === id);
      const targetItem = newItems[targetItemIndex];
      
      if (mode) {
        targetItem.quantity = mode === MODE.up ? targetItem.quantity + 1 : targetItem.quantity - 1;
        if (targetItem.quantity < 1) targetItem.quantity = 1;
      } else {
        targetItem.quantity = isNaN(+value) ? 1 : +value;
      }

      return { ...state, items: newItems, show: false };

    case constants.add: {
      const { payload: { item } } = action;
      const { items } = state;
      const resultItem = { ...item };
      const targetIndex = findIndex(items, u => u.cartId === item.cartId);
      const targetItems = [ ...items ];
      let result = {};

      if (targetIndex >= 0) {
        targetItems[targetIndex].quantity++;
        result = { ...state, items: [ ...targetItems ] };
      } else {
        resultItem.quantity = 1;
        result = { ...state, items: [ ...items, resultItem ] }
      }
      
      return result; 
    }

    case constants.pushOrder: {
      return { ...state, fetching: true }
    }

    case constants.pushOrderFail:
    case constants.pushOrderSuccess: {
      return { ...state, fetching: false }
    }

    case constants.remove: {
      const { payload: { id } } = action;
      const { items } = state;
      const searchIndex = items.findIndex(el => el.cartId === id);

      if (searchIndex >= 0) {
        return { ...state, items: [ ...items.slice(0, searchIndex), ...items.slice(searchIndex + 1)] };
      } else {
        return { ...state };
      }
    }

    default: 
      return { ...state };
  }
}

export const getTotalPrice = state => state.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);