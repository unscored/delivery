import { constants } from '../reducers/user';
import { validateField, validatePhone } from '../../helpers/validator';
import { toast } from "react-toastify";

const updateUserInfo = data => ({ type: constants.updateUser, payload: data });
const clearUserInfo = () => ({ type: constants.clearUser });
const validateOne = data => {
  const validator = data.phone ? validatePhone(data.phone) : validateField(data);
  let action = null;

  if (validator.message) {
    toast.error(validator.message, { autoClose: 4000 });
    action = { type: constants.validationFail, payload: validator };
  }
  else { action = { type: constants.validationSuccess, payload: data }; }

  return action;
}

export default {
  updateUserInfo,
  clearUserInfo,
  validateOne,
};