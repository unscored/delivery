import { connect } from 'react-redux';

import Clients from '../components/Clients';
import actions from '../redux/actions/clients';

export default connect(
  ({ clients }) => ({ clients }),
  dispatch => ({
    getClients: () => dispatch(actions.getClients()),
  })
)(Clients);