import { constants } from '../reducers/clients';
import { API, API_METHODS } from '../../constants';

import Http from '../../http';

const getClients = () => dispatch => {
  dispatch({ type: constants.getClientsStart });

  const body = {
    action: API.clients,
    method: API_METHODS.getClients,
  };

  const onSuccess = result => {
    dispatch({ type: constants.getClientsSuccess, payload: { result } });
  };
  const onError = (error) => {
    console.log(error);
    dispatch({ type: constants.getClientsFail });
  };

  Http.post(body).then(onSuccess).catch(onError);
}

export default {
  getClients,
}