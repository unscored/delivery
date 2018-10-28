

export const constants = {
  UPDATE_USER: 'UPDATE_USER',
};

const model = {
  isLogged: false,
  name: '',
  password: ''
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.UPDATE_USER: {
      console.log(action);
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }
  }
  return state;
}