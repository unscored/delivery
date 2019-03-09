import { connect } from 'react-redux';

import Products from '../components/Products';
import actions from '../redux/actions/products';

export default connect(
  ({ products }) => ({ products }),
  dispatch => ({
    getProducts: () => dispatch(actions.getProducts()),
  })
)(Products);