import { constants } from '../reducers/popUp';

const setPopUp = (id, data = null) => {
	return dispatch => dispatch({ type: constants.setPopUp, payload: { id, data } });
}

export default {
  setPopUp
};