import { connect } from 'react-redux';

import { isFormDataValid, getTotalPrice } from '../redux/reducers';
import Cart from '../components/Cart';
import actions from '../redux/actions/cart';
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
    pushOrder: (items, userInfo, historyPush) => dispatch(actions.pushOrder(items, userInfo, historyPush)),
  }),
)(withScrollTop(Cart));