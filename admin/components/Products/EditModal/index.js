import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, actions as rrfActions } from 'react-redux-form';
import { get } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { Modal, Button } from 'antd';

import productActions from '../../../redux/actions/products';

import { cl } from '../../../utils';
import UploadInput from '../../UploadInput';
import Field from '../../Field';

import { ROOT_FORM } from '../../../constants';

import * as css from './EditModal.scss';

class EditModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    item: PropTypes.shape({})
  };

  static defaultProps = {
    visible: false,
    item: {}
  };

  state = {
    file: null,
    isImageEmpty: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.item && prevProps.item !== this.props.item) {
      this.setState({ file: get(this.props, 'item.image', null) })
    }
  }

  onModalOkClick = () => {
    const { file } = this.state;

    if (file == null) {
      this.setState({ isImageEmpty: true });
    } else {
      this.props.submitForm();
    }
  }

  onModalCancelClick = () => {
    this.setState({ file: null });
    this.props.onCancel();
  }

  onFileInputChange = file => {
    if (file) {
      this.setState({ file, isImageEmpty: false });
    } else {
      this.setState({ file });
    }
    
  }

  onSubmit = async data => {
    const { file } = this.state;
    const { item, updateProduct } = this.props;
    const result = { ...data, file };

    if (file !== get(item, 'image', '') || !_.isEqual(_.omit(data, ['file']), item)) {
      await updateProduct(result);
      console.log('*');
    }
    this.props.onConfirm();
  }

  afterModalClose = () => {
    this.setState({ isImageEmpty: false });
  }

  // renderParams = prop => {
  //   return (
  //     <p key={prop.id}>{prop.name}</p>
      
  //   )
  // }

  renderModalContent = () => {
    const { item } = this.props;
    const { isImageEmpty } = this.state;

    return (
      <Form model={`${ROOT_FORM}.editProduct`} onSubmit={this.onSubmit}>
        <div className={css.inputField}>
          <p>{I18n.t('editProduct.image')}</p>
          <UploadInput
            imageUrl={cl.url(get(item, 'id', ''), { version: get(item, 'image', ''), sign_url: true })}
            onChange={this.onFileInputChange}
            errorMessage={I18n.t('errorMessages.requiredImage')}
            showError={isImageEmpty}
          /> 
        </div>
        <Field
          label={I18n.t('editProduct.name')}
          model=".name"
          errors={{
            required: val => !val.length
          }}
          messages={{
            required: I18n.t('errorMessages.requiredField')
          }}
        />
        <Field
          label={I18n.t('editProduct.descr')}
          model=".description"
          type={Field.TEXTAREA}
          errors={{
            required: val => !val.length,
            length: val => val.length > 200
          }}
          messages={{
            required: I18n.t('errorMessages.requiredField'),
            length: I18n.t('errorMessages.lengthField', { count: 200 }),
          }}
        />
        <Field
          label={I18n.t('editProduct.price')}
          model=".price"
          errors={{
            required: val => !val.length
          }}
          messages={{
            required: I18n.t('errorMessages.requiredField')
          }}
        />
        {/* <div className={css.parameters}>
          <h3>Свойства</h3>
          {map(get(item, 'properties', []), prop => this.renderParams(prop))}
        </div> */}
      </Form>
    );
  }

  render() {
    const visible = get(this.props, 'visible', false);
    const fetching = get(this.props, 'fetching', false);
  
    return (
      <Modal
          title={I18n.t('editProduct.title')}
          visible={visible}
          onOk={this.onModalOkClick}
          onCancel={this.onModalCancelClick}
          destroyOnClose
          afterClose={this.afterModalClose}
          footer={[
            <Button key="back" disabled={fetching} onClick={this.onModalCancelClick}>{I18n.t('cancel')}</Button>,
            <Button key="submit" loading={fetching} type="primary" onClick={this.onModalOkClick}>
              {I18n.t('save')}
            </Button>,
          ]}
        >
          { this.renderModalContent() }
        </Modal>
    );
  }
}

export default connect(
	({ products }) => ({ fetching: get(products, 'fetching', false) }),
	dispatch => ({
    updateProduct: data => dispatch(productActions.updateProduct(data)),
		submitForm: () => dispatch(rrfActions.submit(`${ROOT_FORM}.editProduct`)),
		setErrors: (model, errors) => dispatch(rrfActions.setErrors(`${ROOT_FORM}.editProduct.${model}`, errors)),
	})
)(EditModal);
