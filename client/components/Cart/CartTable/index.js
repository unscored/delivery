import React from 'react';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RowRenderer from './RowRenderer';
import { cartItemTypes } from '../../../propTypes';

import css from './CartTable.scss';

const CartTable = ({ items, deleteItem }) => {
  return (
    <div className={css.cartTable}>
      <table>
        <thead>
          <tr>
            <td className={classNames(css.big60, css.alignCenter)} colSpan="3">{I18n.t('cartTableLabels.productLabel')}</td>
            <td>{I18n.t('cartTableLabels.priceLabel')}</td>
            <td>{I18n.t('cartTableLabels.quantityLabel')}</td>
            <td>{I18n.t('cartTableLabels.totalLabel')}</td>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <RowRenderer
              key={item.cartId}
              item={item}
              deleteItem={deleteItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

CartTable.propTypes = {
  items: PropTypes.arrayOf(cartItemTypes).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default CartTable;
