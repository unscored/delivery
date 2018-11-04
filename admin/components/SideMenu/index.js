import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import {
  MdShoppingCart,
  MdSupervisorAccount,
  MdDashboard,
  MdMenu,
  MdChevronLeft,
} from 'react-icons/md';

import css from './SideMenu.scss';
import { ROUTES_MAP, hideArray } from '../../constants';

class SideMenu extends Component {
  state = {
    isCollapsed: true
  }

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    })
  };

  handleCollapseClick = () => {
     this.setState(prevState => ({
       isCollapsed: !prevState.isCollapsed,
     }));
  }

  renderControlIcon = () => {
    const { isCollapsed } = this.state;

    return (
      isCollapsed
        ? <MdMenu size={24}color={css.iconsColor} />
        : <MdChevronLeft size={24}color={css.iconsColor} />
    );
  }
  
  render() {
    const { isCollapsed } = this.state;

    return (
      !hideArray.includes(location.pathname) && (
        <div className={isCollapsed ? classNames(css.sideMenu, css.collapsed) : css.sideMenu}>
          <div className={css.control}>
            <div onClick={this.handleCollapseClick} className={css.button}>
              {this.renderControlIcon()}
            </div>
          </div>
          <ul className={css.nav}>
            <li>
              <Link to={ROUTES_MAP.main}>
                <MdDashboard size={24} color={css.iconsColor} />
                <p>Главная</p>
              </Link>
            </li>
            <li>
              <Link to={ROUTES_MAP.orders}>
                <MdShoppingCart size={24} color={css.iconsColor} />
                <p>Заказы</p>
              </Link>
            </li>
            <li>
              <Link to={ROUTES_MAP.clients}>
                <MdSupervisorAccount size={24} color={css.iconsColor} />
                <p>Клиенты</p>
              </Link>
            </li>
          </ul>
        </div>
      )
    );
  }
};

export default withRouter(SideMenu);