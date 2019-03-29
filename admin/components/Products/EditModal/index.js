import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { I18n } from 'react-redux-i18n';
import { get } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { Modal } from 'antd';

// import * as css from './EditModal.scss';

export default class EditModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    visible: false
  };

  onModalOkClick = () => {
    this.props.onConfirm();
  }

  onModalCancelClick = () => {
    this.props.onCancel();
  }

  renderModalContent = () => {
    return <p>Hello</p>
  }

  render() {
    const visible = get(this.props, 'visible', false);
  
    return (
      <Modal
          title={I18n.t('editProduct')}
          visible={visible}
          onOk={this.onModalOkClick}
          onCancel={this.onModalCancelClick}
        >
          { this.renderModalContent() }
        </Modal>
    );
  }
}
