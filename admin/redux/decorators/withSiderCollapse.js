import { connect } from 'react-redux';

import actions from '../actions/sider';

export default connect(
  ({ sider }) => ({ isCollapsed: sider.isCollapsed }),
  (dispatch) => ({ toggleSider: () => dispatch(actions.toggleSider()) }),
);