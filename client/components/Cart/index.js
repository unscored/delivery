import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import { cssMQ } from '../../utils';
import CartItemsList from '../CartItemsList';
import Responsive from '../Responsive';
import CartTable from './CartTable';
import UserInfoForm from '../UserInfoForm';
import Button from '../Button';
import { cartItemTypes } from '../../propTypes';

import css from './Cart.scss';

import banner from '../../images/cart-page-2500x600.jpg';
import bannerMob from '../../images/cart-page-2500x600_mobile.jpg';

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
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  onClick = async () => {
    const {
      cartItems,
      userInfo,
      pushOrder,
      history
    } = this.props;

    pushOrder(cartItems, userInfo, history.push);
  }

  render() {
    const {
      cartItems,
      isValid,
      totalPrice,
      deleteFromCart,
    } = this.props;

    return (
      <div>
        <div className="banner" style={{'backgroundImage': `url("${cssMQ.isMobile() ? bannerMob : banner}")`}}></div>
        <div className="container">
          <div className={css.pageContent}>
            <div className={css.catItemsWrap}>
              {cartItems.length
                ? (
                  <Fragment>
                    <Responsive query={Responsive.DESKTOP}>
                      <CartTable items={cartItems} deleteItem={deleteFromCart} />
                    </Responsive>
                    <Responsive query={Responsive.MOBILE}>
                      <CartItemsList items={cartItems} onDeleteItem={deleteFromCart} />
                    </Responsive>
                    <div className={css.orderRow}>
                      <div className={css.cartTotal}>
                        <p>{`${I18n.t('cartTableLabels.totalLabel')}: ${totalPrice} ${I18n.t('currency')}`}</p>
                      </div>
                      <Responsive query={Responsive.DESKTOP}>
                        <div className={css.orderBtn}>
                          <Button
                            disabled={!isValid}
                            value={`${I18n.t('orderBtnTitle')}`}
                            onClick={this.onClick}
                          />
                        </div>
                      </Responsive>
                    </div>
                    <div className={css.additionalData}>
                      <div className={css.additionalDataItem}>
                        <UserInfoForm />
                      </div>
                      <div className={css.additionalDataItem}>
                        {/* CouponBlock */}
                      </div>
                    </div>
                    <Responsive query={Responsive.MOBILE}>
                        <div className={css.orderBtn}>
                          <Button
                            disabled={!isValid}
                            value={`${I18n.t('orderBtnTitle')}`}
                            onClick={this.onClick}
                          />
                        </div>
                      </Responsive>
                  </Fragment>
                )
                : (
                  <div className={css.emptyCartMessage}>
                    <p>{I18n.t('emptyCartText')}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  } 
}