import { connect } from 'react-redux';

import LogIn from '../../components/LogIn';
import actions from '../../redux/actions/user';

export default connect(
  ({ user }) => ({ user }),
  (dispatch) => ({
    updateUserInfo: e => {
      const { value, name } = e.target;
      dispatch(actions.updateUser({[`${name}`]: value}));
    },
    login: ({ name, password }) => dispatch(actions.login(name, password)),
  })
)(LogIn) ;
