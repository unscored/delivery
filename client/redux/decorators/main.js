import { connect } from 'react-redux';

import actions from '../actions/products';
import cartActions from '../actions/cart';

export default connect(
  ({ products }) => ({ products }),
  dispatch => ({
    getProducts: (type) => dispatch(actions.getProducts(type)),
    addToCart: (item) => dispatch(cartActions.addToCart(item)),
  }),
);