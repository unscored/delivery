import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Button.scss';

const Button = (props) => {
  const { value, primary, onClick, disabled } = props;
  const buttonClass = primary ? css.btn : classNames(css.btn, css.btnTransparent);
  const resultClass = disabled ? `${buttonClass} ${css.disabled}` : buttonClass;

  return (
    <a
      href="#"
      className={resultClass}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {value}
    </a>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  primary: false,
  onClick: () => {},
  disabled: false,
}

export default Button;