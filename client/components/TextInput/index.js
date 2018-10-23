import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

const TextInput = (props) => {
  const { mask, ...rest } = props;

  return (
    <div className="text-input">
      {mask ? <MaskedInput mask={mask} {...rest} /> : <input {...rest} /> }
    </div>
  )
};

TextInput.propTypes = {

};

export default TextInput;