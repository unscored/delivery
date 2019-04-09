import { connect } from 'react-redux';
import { actions as rrfActions } from 'react-redux-form';

import Products from '../components/Products';
import actions from '../redux/actions/products';

export default connect(
  ({ products }) => ({ products }),
  dispatch => ({
    getProducts: () => dispatch(actions.getProducts()),
    changeForm: (model, value) => dispatch(rrfActions.change(model, value, { silent: true }))
  })
)(Products);