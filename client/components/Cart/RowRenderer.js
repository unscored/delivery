import React from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import QuantityInput from '../../containers/QuantityInput';
import { cartItemTypes } from '../../propTypes';

const RowRenderer = ({ item, deleteItem}) => {
  const totalPrice = item.quantity * item.price;
  const params = item.selectedProps.join(', ');

  return (
    <tr className="bordered" key={item.cartId}>
      <td>
        <span
          className="remove-button"
          onClick={() => {deleteItem(item.cartId)}}
        >
          <FaTimes />
        </span>
      </td>
      <td><img className="cart-table-image" src={item.image} /></td>
      <td className="big-40">
        <div className="item-info">
          <p className="name">{item.name}</p>
          <p>{params}</p>
        </div>
      </td>
      <td className="decor">{`${item.price} ${I18n.t('currency')}`}</td>
      <td>
        <QuantityInput
          itemId={item.cartId}
          itemQuantity={item.quantity}
          baseClass="quantity-item-input"
        />
      </td>
      <td className="decor">{`${totalPrice} ${I18n.t('currency')}`}</td>
    </tr>
  );
}

RowRenderer.propTypes = {
  item: cartItemTypes,
  deleteItem: PropTypes.func.isRequired,
};

export default RowRenderer;