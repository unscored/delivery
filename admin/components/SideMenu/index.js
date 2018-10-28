import React from 'react';
import { Link } from 'react-router-dom';

import css from './SideMenu.scss';
import { ROUTES_MAP } from '../../constants';


const SideMenu = () => (
  <div className={css.sideMenu}>
    <ul>
      <li><Link to={ROUTES_MAP.main}>Main</Link></li>
      <li><Link to={ROUTES_MAP.orders}>Orders</Link></li>
      <li><Link to={ROUTES_MAP.clients}>Clients</Link></li>
    </ul>
  </div>
);

export default SideMenu;