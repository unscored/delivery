import React from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import QuantityInput from '../../../containers/QuantityInput';
import { cartItemTypes } from '../../../propTypes';

import css from './CartTable.scss';

const RowRenderer = ({ item, deleteItem}) => {
  const totalPrice = item.quantity * item.price;
  const params = item.selectedProps.join(', ');

  return (
    <tr className={css.bordered} key={item.cartId}>
      <td>
        <span
          className={css.removeBtn}
          onClick={() => {deleteItem(item.cartId)}}
        >
          <FaTimes />
        </span>
      </td>
      <td><img className={css.cartTableImage} src={item.image} /></td>
      <td className={css.big40}>
        <div className={css.itemInfo}>
          <p className={css.name}>{item.name}</p>
          <p>{params}</p>
        </div>
      </td>
      <td className={css.decor}>{`${item.price} ${I18n.t('currency')}`}</td>
      <td>
        <QuantityInput
          itemId={item.cartId}
          itemQuantity={item.quantity}
          baseClass={css.quantityItemInput}
        />
      </td>
      <td className={css.decor}>{`${totalPrice} ${I18n.t('currency')}`}</td>
    </tr>
  );
}

RowRenderer.propTypes = {
  item: cartItemTypes,
  deleteItem: PropTypes.func.isRequired,
};

export default RowRenderer;