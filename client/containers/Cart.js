import { connect } from 'react-redux';
import _ from 'lodash';

import { isFormDataValid, getTotalPrice } from '../redux/reducers';
import Cart from '../components/Cart';
import actions from '../redux/actions/cart';
import withScrollTop from '../components/decorators/withScrollTop';

export default connect (
  (state) => {
    const user = _.get(state, 'user', {});
    const items = _.get(state, 'cart.items', []);
    const fetching = _.get(state, 'cart.fetching', false);
    const totalPrice = getTotalPrice(state);
    const isValid = isFormDataValid(state);

    return {
      cartItems: items,
      totalPrice, 
      userInfo: user,
      orderFetching: fetching,
      isValid,
    }
  },
  dispatch => ({
    deleteFromCart: id => dispatch(actions.deleteFromCart(id)),
    pushOrder: (items, userInfo, historyPush) => dispatch(actions.pushOrder(items, userInfo, historyPush)),
  }),
)(withScrollTop(Cart));