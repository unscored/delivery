import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { menuItemType } from '../../../propTypes';

import css from './MenuItem.scss';


const MenuItem = ({ item, onClick, ...props }) => {
  const onItemClick = () => {
    onClick(item.name);
  };

  return (
    <li className={css.menuItem} onClick={onItemClick} {...props}>
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
  )
}

MenuItem.defaultProps = {
  onClick: _.noop,
};

MenuItem.propTypes = {
  item: menuItemType,
  onClick: PropTypes.func,
};

export default MenuItem;
