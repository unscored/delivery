import { connect } from 'react-redux';

import PopUpManager from './PopUpManager';

const mapStateToProps = ({ popUp }) => ({ popUp });

export default connect(mapStateToProps, null)(PopUpManager);
