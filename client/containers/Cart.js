import { connect } from 'react-redux';

import { isFormDataValid, getTotalPrice } from '../redux/reducers';
import Cart from '../components/Cart';
import actions from '../redux/actions/cart';
import modalActions from '../redux/actions/modal';
import withScrollTop from '../components/decorators/withScrollTop';

export default connect (
  (state) => {
    const { user, cart: { items } } = state;
    const totalPrice = getTotalPrice(state);
    const isValid = isFormDataValid(state);

    return {
      cartItems: items,
      totalPrice, 
      userInfo: user,
      isValid,
    }
  },
  dispatch => ({
    deleteFromCart: id => dispatch(actions.deleteFromCart(id)),
    pushOrder: (items, userInfo) => dispatch(actions.pushOrder(items, userInfo)),
    setModal: id => dispatch(modalActions.setModal(id)),
  }),
)(withScrollTop(Cart));