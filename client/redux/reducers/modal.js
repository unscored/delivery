export const constants = {
  setModal: 'SET_MODAL',
};

export default function (state = null, action) {
  switch (action.type) {
    case constants.setModal:
      return action.payload;
    
    default: 
      return state;
  }
};