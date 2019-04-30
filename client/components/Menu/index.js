import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdMenu } from 'react-icons/md';
import classNames from 'classnames';

import { cssMQ, analytics } from '../../utils';
import { menuItemsType } from '../../propTypes';
import MenuItem from './MenuItem';

import css from './Menu.scss';

export default class Menu extends Component {
  static defaultProps = {
    items: [],
  };

  static propTypes = {
    items: menuItemsType,
    isOpen: PropTypes.bool,
    handleMenuBtnClick: PropTypes.func.isRequired,
    handleMenuItemClick: PropTypes.func.isRequired,
  };

  onMenuItemClick = (itemName) => {
    analytics.onMenuItemClick(itemName);
    this.props.handleMenuItemClick();
  };
  
  render() {
    const { handleMenuBtnClick, isOpen } = this.props;

    return (
      <div className={classNames(css.sideMenu, { [css.opened]: isOpen })}>
        <div className={css.sideMenuContent}>
          <ul>
            { this.props.items.map(item => <MenuItem key={`menu-item-${item.id}`} item={item} onClick={this.onMenuItemClick} />) }
          </ul>
        </div>
        <div
          className={css.toggleBtn}
          onClick={handleMenuBtnClick}
        >
          <div className={css.toggleBtnIcon}>
            <MdMenu size={cssMQ.isMobile() ? 22 : 36} color={'#FFF'}/>
          </div>
        </div>
      </div>
    )
  }
};

