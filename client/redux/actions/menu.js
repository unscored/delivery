import { constants } from '../reducers/menu';

const toggle = () => ({ type: constants.toggle });
const show = () => ({ type: constants.show });
const hide = () => ({ type: constants.hide });

export default {
  toggle,
  show,
  hide,
};