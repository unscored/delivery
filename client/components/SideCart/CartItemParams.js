import React from 'react';
import PropTypes from 'prop-types';

const CartItemParams = ({items}) => {
  return (
    <ul className="params">
      {items && items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

CartItemParams.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CartItemParams;