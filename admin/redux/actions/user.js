import { constants } from '../reducers/user';
import { API, API_METHODS } from '../../constants';
import Http from '../../http';


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
    dispatch({ type: constants.loginSuccess, payload: { ...result } });
  };
  const onError = (error) => {
    console.log('error', error);
    dispatch({ type: constants.loginFail, payload: error });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

const logout = () => ({ type: constants.logout });

export default {
  updateUser,
  login,
  logout,
}