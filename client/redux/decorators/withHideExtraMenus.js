import React from 'react';
import { connect } from 'react-redux';

import actions from '../actions/cart';
import menuActions from '../actions/menu';

const HOC = connect(
  state => ({
    isCartShow: state.cart.show,
    isMenuShow: state.menu.show,
  }),
  dispatch => ({
    hideCart: () => dispatch(actions.hide()),
    hideMenu: () => dispatch(menuActions.hide()),
  }),
)(({
  onClick, hideCart, hideMenu, component: Component, isCartShow, isMenuShow, ...props
}) => (
<Component
  {...props}
  onClick={(...clickProps) => {
    if (isCartShow && isMenuShow) {
      hideCart();
      hideMenu();
    } else if (isCartShow) {
      hideCart();
    } else if (isMenuShow) {
      hideMenu();
    }
    
    if (onClick) return onClick(...clickProps, isCartShow, isMenuShow);
    return null;
  }}
/>
));
export default component => props => <HOC {...props} component={component} />;

