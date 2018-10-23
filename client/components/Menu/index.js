import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

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
        <li key={item.id} className="menu-item" onClick={handleMenuItemClick}>
          <NavLink
            key={item.id}
            to={item.path}
            className="menu-item__link"
            activeClassName="menu-item__link_active"
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
    const sideMenuCLass = isOpen ? "side-menu opened" : "side-menu";

    return (
      <div className={sideMenuCLass}>
        <div className="side-menu__content">
          <ul className="side-menu_items">
            {this._renderItems()}
          </ul>
        </div>
        <div
          className="toggle-btn"
          onClick={handleMenuBtnClick}
        >
          <div className="toggle-btn__icon">
            <MdMenu size={36} color={'#FFF'}/>
          </div>
        </div>
      </div>
    )
  }
};

