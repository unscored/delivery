import React from 'react';
import PropTypes from 'prop-types';
import { MdShoppingCart } from 'react-icons/md';
import { I18n } from 'react-redux-i18n';
import classNames from 'classnames';

import CartItemsList from '../CartItemsList'
import Button from '../Button';
import { cssMQ, analytics } from '../../utils';
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

  const onViewShopCartClick = () => {
    history.push(cartRoute);
    analytics.onShowCartClick();
  }
  const onCartIconClick = () => {
    const action = show ? 'hide' : 'show';
  
    analytics.onCartIconClick(action);
    handleCartBtnClick();
  }
  return (
    <div className={classNames(css.orderCart, { [css.opened]: show })}>
      <div className={css.orderCartContent}>
        <div className={css.title}>
          <h3>{I18n.t('cart')}</h3>
        </div>

        <div className={css.line}></div>

        { cartItems.length !== 0 ?
          (
            <div>
              <CartItemsList items={cartItems} onDeleteItem={deleteFromCart}/>

              <div className={css.total}>
                <p>{I18n.t('totalOrder')}</p>
                <p>{totalPrice} {I18n.t('currency')}.</p>
              </div>

              <div>
                <div className={css.buttonItem}>
                  <ButtonWithHideCart 
                    value={I18n.t('viewShopCart')}
                    onClick={onViewShopCartClick}
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
        onClick={onCartIconClick}
      >
        <div className={css.cartIcon}>
          <MdShoppingCart size={cssMQ.isMobile() ? 22 : 38} color={'#FFF'}/>
        </div>

        {totalItemsCount !== 0
          && (
            <div className={css.count}>
              <p className={css.countText}>
                <span>{totalItemsCount > 9 ? '9+' : totalItemsCount}</span>
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