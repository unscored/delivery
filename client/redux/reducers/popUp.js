export const constants = {
  setPopUp: 'SET_POP_UP',
};

const initialState = {
	id: null,
	data: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case constants.setPopUp:
      return {
        ...payload
      };
    
    default: 
      return state;
  }
};
