import { constants } from '../reducers/user';

const updateUser = data => {
  return {
    type: constants.UPDATE_USER,
    payload: data,
  }
}

export default {
  updateUser,
}