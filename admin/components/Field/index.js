import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Errors, Control } from 'react-redux-form';
import { Input } from 'antd';

import * as css from './Field.scss';

const MyTextInput = props => {
  const { touched, focus, valid } = props.field;

  return (
    <Input
      className={classNames(css.input, { [css['err-input']]: touched && !focus && !valid })}
      {..._.omit(props, ['field'])}
    />
  )
}
const MyTextArea = props => {
  const { touched, focus, valid } = props.field;

  return (
    <Input.TextArea
      className={classNames(css.input, { [css['err-input']]: touched && !focus && !valid })}
      autosize
      {..._.omit(props, ['field'])} />
  )
}
const MyError = props => <div className={css.error}>{props.children}</div>;

const Field = ({ className, label, model, errors, messages, type }) => {
  const getComponentByType = () => {
    switch (type) {
      case Field.TEXTAREA:
        return MyTextArea;

      case Field.TEXT:
        return MyTextInput;

      default:
        return MyTextInput;
    }
  };

  return (
    <div className={classNames(css.inputField, className)}>
      <p>{label}</p>
      <Control
        model={model}
        component={getComponentByType()}
        mapProps={{field: props => props.fieldValue}}
        errors={errors}
      />
      <Errors
        model={model}
        show={{touched: true, focus: false}}
        messages={messages}
        component={MyError}
      />
    </div>
  )
};

Field.TEXTAREA = 'textarea';
Field.TEXT = 'text';

Field.defaultProps = {
  className: '',
  type: Field.TEXT,
  label: 'Label',
  errors: {},
  messages: {}

};

Field.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  model: PropTypes.string.isRequired,
  errors: PropTypes.shape({}),
  messages: PropTypes.shape({})
};

export default Field;
