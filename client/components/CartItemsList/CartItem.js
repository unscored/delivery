import React from 'react';
import { I18n } from 'react-redux-i18n';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Params from './CartItemParams';

import css from './CartItemsList.scss';

const CartItem = (props) => {
  const { item, onPressDelete } = props;
  return (
    <div className={css.cartItem}>
      <span
        className={css.cartItemDelBtn}
        onClick={() => onPressDelete()}
      >
        <FaTimes />
      </span>
      <div className={css.cartItemImg}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={css.cartItemInfo}>
        <p className={css.cartItemInfoName}>{item.name}</p>
        <Params items={item.selectedProps} />
        <p className={css.countPrice}><span>{item.quantity} x </span>{item.price} {I18n.t('currency')}</p>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string,
    selectedProps: PropTypes.array,
  }).isRequired,
  onPressDelete: PropTypes.func,
}

CartItem.defaultProps = {
  onPressDelete: () => {},
}

export default CartItem;