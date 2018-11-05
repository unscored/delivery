import { connect } from 'react-redux';

import actions from '../actions/user';

export default connect(
  ({ user }) => ({ user }),
  (dispatch) => ({ logout: () => dispatch(actions.logout()) }),
);