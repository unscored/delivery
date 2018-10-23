import { constants } from '../reducers/modal';

const setModal = (id) => ({ type: constants.setModal, payload: id });

export default {
  setModal
};