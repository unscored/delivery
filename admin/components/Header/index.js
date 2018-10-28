import React from 'react';
import { I18n } from 'react-redux-i18n';
import User from '../User';

import css from './Header.scss';


const Header = () => (
  <div className={css.header}>
    <div className={css.title}>
      <h1>{I18n.t('brand')}</h1>
    </div>
    <User name="admin"/>
  </div>
);

export default Header;