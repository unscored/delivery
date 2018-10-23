import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { I18n } from 'react-redux-i18n';

import actions from '../actions/menu';
import cartActions from '../actions/cart';
import { ROUTES_MAP } from '../../constants';

export default compose(
  withRouter,
  connect(
    store => ({
      menuItems: store.menu.items.map(item => ({ ...item, name: I18n.t(`menu.${item.name}`)}) ),
      show: store.menu.show,
      cartShow: store.cart.show,
    }),
    dispatch => ({
      onPressMenuBtn: () => dispatch(actions.toggle()),
      onMenuItemPress: ({ cartShow }) => {
        dispatch(actions.toggle());
        cartShow && dispatch(cartActions.hide());
      }
    })
  )
);