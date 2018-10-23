import { forEach } from 'lodash';
import { FORMS } from '../redux/reducers/user';
import { I18n } from 'react-redux-i18n';

//input validation
// const incorrectEmail = 'Please provide correct email.';
const incorrectPhone = I18n.t('correctPhone');
const emptyField = I18n.t('emptyFields');

const phoneReg = /^\+\d{2} *\(\d{3}\) *\d{3} *\d{2}\d{2}$/;
// const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateField = (val = {}) => {
  let error = {
    type: '',
    message: '',
  };

  forEach(val, (value, key) => {
    if (!value) {
      error.type = key;
      error.message = emptyField;
    }
  });

  return error;
};

export const valByReg = (type, string = '', reg, errMess = '') => {
  let error = {
    type: '',
    message: '',
  };

  if (!string.length) {
    return validateField({ [`${type}`]: string });
  }

  if (string && !reg.test(string.trim())) {
    error.type = type;
    error.message = errMess;
    return error;
  }

  return error
};

// export const valEmail = (email = '') => {
//     return valByReg(`${FORMS.email}`, email, emailReg, incorrectEmail);
// };

export const  validatePhone = (phone = '') => {
    return valByReg(`${FORMS.phone}`, phone, phoneReg, incorrectPhone);
};

/**
 * @param {Array} arr
 *
 * @private
 * @returns {Boolean}
 */
export const isError = (arr, type) => {
  let error = -1;
  let result = false;

  if (arr.length === 0) {
    return result;
  }

  error = arr.findIndex((val) => (val === type));
  result = error >= 0;

  return result;
};
