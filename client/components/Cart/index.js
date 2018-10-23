import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import CartTable from './CartTable';
import UserInfoForm from '../UserInfoForm';
import Button from '../Button';
import { cartItemTypes } from '../../propTypes';
import { SUCCESS_PUSH_ORDER_MODAL } from '../../constants';

export default class Cart extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(cartItemTypes).isRequired,
    totalPrice: PropTypes.number.isRequired,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      errors: PropTypes.array,
    }).isRequired,
    isValid: PropTypes.bool.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    pushOrder: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
  };

  onClick = async () => {
    const {
      cartItems,
      userInfo,
      pushOrder,
      setModal
    } = this.props;

    await pushOrder(cartItems, userInfo);
    setModal(SUCCESS_PUSH_ORDER_MODAL);
  }

  render() {
    const {
      cartItems,
      isValid,
      totalPrice,
      deleteFromCart,
    } = this.props;

    return (
      <div className="cart-page">
        <div className="banner banner-cart" />
        <div className="container">
          {cartItems.length
            ? (
              <Fragment>
                <CartTable items={cartItems} deleteItem={deleteFromCart} />
                <div className="order-row">
                  <div className="col-6 cart-total">
                    <p>{`${I18n.t('cartTableLabels.totalLabel')}: ${totalPrice} ${I18n.t('currency')}`}</p>
                  </div>
                  <div className="col-2 order-btn">
                    <Button
                      disabled={!isValid}
                      value={`${I18n.t('orderBtnTitle')}`}
                      onClick={this.onClick}
                    />
                  </div>
                </div>
                <div className="additional-data row justify-content-between">
                  <div className="col-5">
                    <UserInfoForm />
                  </div>
                  <div className="col-5">
                    {/* CouponBlock */}
                  </div>
                </div>
              </Fragment>
            )
            : (
              <div className="empty-cart-message">
                <p>{I18n.t('emptyCartText')}</p>
              </div>
            )
          }
        </div>
      </div>
    );
  } 
}