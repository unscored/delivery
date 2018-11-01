import { connect } from 'react-redux';

import Orders from '../components/Orders';
import actions from '../redux/actions/orders';

export default connect(
  ({ orders }) => ({ orders }),
  dispatch => ({
    getOrders: () => dispatch(actions.getOrders()),
  })
)(Orders);
