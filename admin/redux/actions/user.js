import { constants } from '../reducers/user';
import { API, API_METHODS } from '../../constants';
import Http from '../../http';
import { resolve } from 'url';


const updateUser = data => {
  return {
    type: constants.updateUser,
    payload: data,
  }
}

const login = (name, password) => dispatch => {
  dispatch({ type: constants.loginStart });

  const body = {
    action: API.users,
    method: API_METHODS.login,
    data: [{ name, password }],
  };

  const onSuccess = result => {
    console.log(result);
    dispatch({ type: constants.loginSuccess, payload: { ...result } });
  };
  const onError = (error) => {
    console.log('error', error);
    dispatch({ type: constants.loginFail, payload: error });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

export default {
  updateUser,
  login,
}