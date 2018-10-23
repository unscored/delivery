import { MENU } from '../../constants';

export const constants = {
  toggle: 'TOGGLE_MENU',
  show: 'SHOW_MENU',
  hide: 'HIDE_MENU',
};
const model = {
  items: MENU,
  show: false,
};

export default function (state = model, action) {
  switch (action.type) {
    case constants.toggle:
      return { ...state, show: !state.show };
    
    case constants.show:
      return { ...state, show: true };

    case constants.hide:
      return { ...state, show: false };
    
    default: 
      return { ...state };
  }
}