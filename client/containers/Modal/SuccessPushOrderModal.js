import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import actions from '../../redux/actions/modal';
import userActions from '../../redux/actions/user';
import cartActions from '../../redux/actions/cart';
import { ROUTES_MAP } from '../../constants';
import Button from '../../components/Button';

class SuccessPushOrderModal extends Component {
  static propTypes = {
    setModal: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  handleOKClick = () => {
    this.props.setModal(null);
    this.props.clearCart();
    this.props.clearUser();
    this.props.history.push(ROUTES_MAP.main);
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="title">
            <h3>{I18n.t('successOrderModalTitle')}</h3>
          </div>
          <div className="text">
            <p>{I18n.t('successOrderModalText')}</p>
          </div>
          <div className="col-6">
            <Button
              value={I18n.t('ok')}
              onClick={this.handleOKClick}
              primary
            />
          </div>
        </div>
      </div>
    )
  };
}

export default connect(
  null,
  dispatch => ({
    setModal: id => dispatch(actions.setModal(id)),
    clearUser: () => dispatch(userActions.clearUserInfo()),
    clearCart: () => dispatch(cartActions.clearCart()),
  }),
)(withRouter(SuccessPushOrderModal));