import { keys, findIndex } from 'lodash';

export const constants = {
  updateUser: 'UPDATE_USER_INFO',
  clearUser: 'CLEAR_USER_INFO',
  validationFail: 'FIELD_VALIDATION_FAILED',
  validationSuccess: 'FIELD_VALIDATION_SUCCESSED',
};

export const FORMS = {
  name: 'name',
  phone: 'phone',
  address: 'address',
};

const model = {
  name: '',
  phone: '',
  address: '',
  errors: [],
};

export default function (state = model, action) {
  switch (action.type) {
    case constants.updateUser: {
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }

    case constants.clearUser: {
      return model;
    }

    case constants.validationFail: {
      const { payload } = action;

      return {
        ...state,
        errors: [
          ...state.errors,
          payload
        ],
      };
    }

    case constants.validationSuccess: {
      const { payload } = action;
      const { errors } = state;
      const types = keys(payload);
      const errorIndex = findIndex(errors, e => e.type === types[0]);

      return {
        ...state,
        errors: [
          ...state.errors.slice(0, errorIndex),
          ...state.errors.slice(errorIndex + 1),
        ],
      };
    }

    default: 
      return { ...state };
  }
}

export const isFormDataValid = state => state.errors.length === 0 && (state.name !== '' && state.address !== '' && state.phone !== '');