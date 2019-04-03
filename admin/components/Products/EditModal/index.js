import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Control } from 'react-redux-form';
import { get, map } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { Modal, Input } from 'antd';

import { ROOT_FORM } from '../../../constants';

import * as css from './EditModal.scss';

const MyTextInput = (props) => <Input className="my-input" {...props} />;
const MyTextArea = (props) => <Input.TextArea className="my-texrarea" autosize {...props} />;

export default class EditModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    item: PropTypes.shape({})
  };

  static defaultProps = {
    visible: false,
    item: {}
  };

  onModalOkClick = () => {
    this.props.onConfirm();
  }

  onModalCancelClick = () => {
    this.props.onCancel();
  }

  onSubmit = data => console.log(data); 

  renderParams = prop => {
    return (
      <p key={prop.id}>{prop.name}</p>
      
    )
  }

  renderModalContent = () => {
    const { item } = this.props;

    return (
      <Form model={`${ROOT_FORM}.editProduct`} onSubmit={this.onSubmit}>
        <div className={css.inputField}>
          <p>Имя</p>
          <Control
            model=".name"
            component={MyTextInput}
          />
        </div>
        <div className={css.inputField}>
          <p>Описание</p>
          <Control
            model=".description"
            component={MyTextArea}
          />
        </div>
        <div className={css.inputField}>
          <p>Цена</p>
          <Control
            model=".price"
            component={MyTextInput}
          />
        </div>
        <div className={css.parameters}>
          <h3>Свойства</h3>
          {map(get(item, 'properties', []), prop => this.renderParams(prop))}
        </div>
      </Form>
    );
  }

  render() {
    const visible = get(this.props, 'visible', false);
    const item = get(this.props, 'item', {});
    console.log(item);
  
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
