import { constants } from '../reducers/selectedItems';

export const setItem = (payload) => dispatch => {
  dispatch({type: constants.setItem, payload});
}

export default {
  setItem,
};