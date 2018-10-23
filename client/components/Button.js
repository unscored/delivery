import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { value, primary, onClick, disabled } = props;
  const buttonClass = primary ? 'btn' : 'btn btn_transparent';
  const resultClass = disabled ? `${buttonClass} disabled` : buttonClass;

  return (
    <a
      href="#"
      className={resultClass}
      onClick={e => {
        if (disabled) return;
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