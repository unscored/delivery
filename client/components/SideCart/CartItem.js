import React from 'react';
import { I18n } from 'react-redux-i18n';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Params from './CartItemParams';

const CartItem = (props) => {
  const { item, onPressDelete } = props;
  return (
    <div className="cart-item">
      <span
        className="remove-button"
        onClick={() => onPressDelete()}
      >
        <FaTimes />
      </span>
      <div className="img_w">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="info">
        <p className="name">{item.name}</p>
        <Params items={item.selectedProps} />
        <p className="count-price"><span>{item.quantity} x </span>{item.price} {I18n.t('currency')}</p>
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