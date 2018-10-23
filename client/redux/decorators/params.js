import { connect } from 'react-redux';

import actions from '../actions/selectedItems';

const decorator = connect(
  null,
  dispatch => ({
    setActiveParams: (item) => dispatch(actions.setItem(item)), 
  }),
);

export default decorator;