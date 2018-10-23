import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import actions from '../actions/cart';

export default compose(
  withRouter,
  connect(
    store => {
      const { cart: { items, show } } = store;
      const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

      return {
        cartItems: items,
        show,
        totalItemsCount,
        totalPrice, 
      }
    },
    dispatch => ({
      handleCartBtnClick: () => dispatch(actions.toggle()),
      deleteFromCart: (id) => dispatch(actions.deleteFromCart(id))
    }),
  )
);