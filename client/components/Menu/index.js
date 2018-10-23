import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import classNames from 'classnames';

import css from './Menu.scss';

export default class Menu extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      path: PropTypes.string,
    })),
    isOpen: PropTypes.bool,
    handleMenuBtnClick: PropTypes.func.isRequired,
    handleMenuItemClick: PropTypes.func.isRequired,
  };

  _renderItems = () => {
    const { handleMenuItemClick } = this.props;

    return this.props.items.map(item => {
      return (
        <li key={item.id} className={css.menuItem} onClick={handleMenuItemClick}>
          <NavLink
            key={item.id}
            to={item.path}
            className={css.menuItemLink}
            activeClassName={css.menuItemLinkActive}
            exact
          >
            {item.name}
          </NavLink>
        </li>
      );
    })
  };
  
  render() {
    const { handleMenuBtnClick, isOpen } = this.props;
    const sideMenuClass = isOpen ? classNames(css.sideMenu, css.opened) : css.sideMenu;

    return (
      <div className={sideMenuClass}>
        <div className={css.sideMenuContent}>
          <ul>
            {this._renderItems()}
          </ul>
        </div>
        <div
          className={css.toggleBtn}
          onClick={handleMenuBtnClick}
        >
          <div className={css.toggleBtnIcon}>
            <MdMenu size={36} color={'#FFF'}/>
          </div>
        </div>
      </div>
    )
  }
};

