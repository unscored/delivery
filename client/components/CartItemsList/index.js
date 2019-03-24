import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';
import CartItem from './CartItem';

import css from './CartItemsList.scss';

const CartItemsList = ({ items, onDeleteItem }) => {
  return (
      <List
        classNameCss={css.itemsList}
        items={items}
        ListItem={({item}) => (
          <CartItem item={item} onPressDelete={() => onDeleteItem(item.cartId)}/>
        )}
        keyExtractor={item => item.cartId}
      />
  )
}

// CartItemsList.defaultProps = {

// };

CartItemsList.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

export default CartItemsList;
