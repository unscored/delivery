import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import SuccessPushOrderModal from './SuccessPushOrderModal';
import { SUCCESS_PUSH_ORDER_MODAL } from '../../constants';

class Modal extends Component {
  root = null;

  componentWillMount = () => {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  };

  componentWillUnmount = () => {
    document.body.removeChild(this.root);
  };

  getCurrentModal = () => {
    const { currentModalID } = this.props;
    let PopUpComponent = null;

    switch (currentModalID) {
      case SUCCESS_PUSH_ORDER_MODAL: {
        PopUpComponent = SuccessPushOrderModal;
        break;
      }
      default:
        PopUpComponent = SuccessPushOrderModal;
        break;
    }

    return (
      <CSSTransition
        timeout={parseInt(PopUpComponent.CSS.animationTime, 10)}
        classNames={PopUpComponent.CSS}
        unmountOnExit
      >
        <PopUpComponent />
      </CSSTransition>
    );
  }

  renderModal = () => {
    const { currentModalID } = this.props;
  
    return (
      <TransitionGroup enter={true} exit={true}>
        {currentModalID && this.getCurrentModal()}
      </TransitionGroup>
    );
  }

  render() {
    return ReactDOM.createPortal(
      this.renderModal(),
      this.root
    );
  }
}

export default connect(
  ({currentModalID}) => ({currentModalID}),
  null,
)(Modal);