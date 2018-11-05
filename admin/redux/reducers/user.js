

export const constants = {
  updateUser: 'UPDATE_USER',
  loginStart: 'LOGIN_START',
  loginSuccess: 'LOGIN_SUCCESS',
  loginFail: 'LOGIN_FAIL',
  logout: 'LOGOUT',
};

const model = {
  fetching: false,
  name: '',
  password: '',
  error: null,
  token: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.updateUser: {
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }

    case constants.loginStart: {
      return {
        ...state,
        fetching: true,
      };
    }

    case constants.loginSuccess: {
      const { payload: { name, token } } = action;

      return {
        ...state,
        fetching: false,
        name,
        password: '',
        error: null,
        token,
      };
    }
    
    case constants.loginFail: {
      const { payload: { message } } = action;

      return {
        ...state,
        fetching: false,
        error: message,
      };
    }

    case constants.logout: {
      return model;
    }

    default: 
      return { ...state };
  }
}