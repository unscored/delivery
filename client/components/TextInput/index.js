import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

import css from './TextInput.scss';

const TextInput = (props) => {
  const { mask, ...rest } = props;

  return (
    <div className={css.textInput}>
      {mask ? <MaskedInput mask={mask} {...rest} /> : <input {...rest} /> }
    </div>
  )
};

TextInput.propTypes = {
  mask: PropTypes.array,
};

export default TextInput;