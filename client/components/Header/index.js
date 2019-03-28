import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

import Menu from '../Menu';
import SideCart from '../../containers/SideCart';
import { ROUTES_MAP } from '../../constants';
import logo from '../../images/logo.png';
import withHideExtraMenus from '../../redux/decorators/withHideExtraMenus';

import css from './Header.scss';

const Logo = withHideExtraMenus(Link);

const Header = (props) => {
  const { menuItems, onPressMenuBtn, onMenuItemPress, show } = props;

  return (
    <header>
      <Menu
        items={menuItems}
        handleMenuBtnClick={onPressMenuBtn}
        handleMenuItemClick={() => onMenuItemPress(props)}
        isOpen={show}
      />
      <div className={css.headerLogo}>
        <Logo to={ROUTES_MAP.main}><img src={logo} alt="Belvedere"/></Logo>
      </div>
      <SideCart />
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  onMenuItemPress: PropTypes.func.isRequired,
  onPressMenuBtn: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Header;