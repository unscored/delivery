import React from 'react';
import PropTypes from 'prop-types';
import { MdShoppingCart } from 'react-icons/md';
import { I18n } from 'react-redux-i18n';

import Button from '../Button';
import List from '../List';
import CartItem from './CartItem';
import { ROUTES_MAP } from '../../constants';
import withHideExtraMenus from '../../redux/decorators/withHideExtraMenus';

import css from './SideCart.scss';

const { cart: cartRoute } = ROUTES_MAP;
const ButtonWithHideCart = withHideExtraMenus(Button);

const Cart = props => {
  const {
    show,
    handleCartBtnClick,
    cartItems,
    deleteFromCart,
    totalItemsCount,
    totalPrice,
    history,
  } = props;
  const cartClass = show ? [css.orderCart, css.opened].join(' ') : css.orderCart;

  return (
    <div className={cartClass}>
      <div className={css.orderCartContent}>
        <div className={css.title}>
          <h3>{I18n.t('cart')}</h3>
        </div>

        <div className={css.line}></div>

        { cartItems.length !== 0 ?
          (
            <div>
              <List
                classNameCss={css.itemsList}
                items={cartItems}
                ListItem={({item}) => (
                  <CartItem item={item} onPressDelete={() => deleteFromCart(item.cartId)}/>
                )}
                keyExtractor={item => item.cartId}
              />

              <div className={css.total}>
                <p>{I18n.t('totalOrder')}</p>
                <p>{totalPrice} {I18n.t('currency')}.</p>
              </div>

              <div>
                <div className={css.buttonItem}>
                  <ButtonWithHideCart 
                    value={I18n.t('viewShopCart')}
                    onClick={() => history.push(cartRoute)}
                  />
                </div>
              </div>
            </div>
          )
          : (
            <div className={css.emptyCart}>
              <p>{I18n.t('emptyCartText')}</p>
            </div>
          )
        }
      </div>
      <div
        className={css.toggleBtn}
        onClick={handleCartBtnClick}
      >
        <div className={css.cartIcon}>
          <MdShoppingCart size={38} color={'#FFF'}/>
        </div>

        {totalItemsCount !== 0
          && (
            <div className={css.count}>
              <p className={css.countText}>
                <span>{totalItemsCount}</span>
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

Cart.propTypes = {
  handleCartBtnClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  cartItems: PropTypes.array.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Cart;