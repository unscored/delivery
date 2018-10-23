import React from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { I18n } from 'react-redux-i18n';

import Button from '../Button';
import List from '../List';
import CartItem from './CartItem';
import { ROUTES_MAP } from '../../constants';
import withHideExtraMenus from '../../redux/decorators/withHideExtraMenus';

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
  const cartClass = show ? 'order-cart opened' : 'order-cart';

  return (
    <div className={cartClass}>
      <div className="order-cart__content">
        <div className="title">
          <h3>{I18n.t('cart')}</h3>
        </div>

        <div className="line"></div>

        { cartItems.length !== 0 ?
          (
            <div className="cart-info">
              <List
                classNameCss="items-list"
                items={cartItems}
                ListItem={({item}) => (
                  <CartItem item={item} onPressDelete={() => deleteFromCart(item.cartId)}/>
                )}
                keyExtractor={item => item.cartId}
              />

              <div className="total">
                <p>{I18n.t('totalOrder')}</p>
                <p>{totalPrice} {I18n.t('currency')}.</p>
              </div>

              <div className="buttons_wrap">
                <div className="button_item">
                  <ButtonWithHideCart 
                    value={I18n.t('viewShopCart')}
                    onClick={() => history.push(cartRoute)}
                  />
                </div>
                <div className="button_item">
                  <Button primary value={I18n.t('checkout')} />
                </div>
              </div>
            </div>
          )
          : (
            <div className="empty-cart">
              <p>{I18n.t('emptyCartText')}</p>
            </div>
          )
        }
      </div>
      <div
        className="order-cart__toggle-btn"
        onClick={handleCartBtnClick}
      >
        <div className="cart-icon">
          <FiShoppingCart size={38} color={'#FFF'}/>
        </div>

        {totalItemsCount !== 0
          && (
            <div className="count">
              <p className="count-text">
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