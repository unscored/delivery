import React from 'react';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';

import User from '../User';
import { hideArray } from '../../constants';

import css from './Header.scss';


const Header = ({ location }) => (
  !hideArray.includes(location.pathname)
    && (
      <div className={css.header}>
        <div className={css.title}>
          <h1>{I18n.t('brand')}</h1>
        </div>
        <User name="admin"/>
      </div>
    )
);

export default withRouter(Header);