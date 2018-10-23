import React from 'react';
import PropTypes from 'prop-types';

import css from './SideCart.scss';

const CartItemParams = ({items}) => {
  return (
    <ul className={css.params}>
      {items && items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

CartItemParams.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CartItemParams;