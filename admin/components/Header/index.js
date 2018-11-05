import React from 'react';
import { I18n } from 'react-redux-i18n';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import User from '../User';
import { hideArray } from '../../constants';

import css from './Header.scss';


const { Header } = Layout;

const HeaderComponent = ({ location }) => (
  !hideArray.includes(location.pathname)
    && (
      <Header style={{ position: 'fixed', zIndex: 100, width: '100%' }}>
        <div className={css.title}>
          <h1>{I18n.t('brand')}</h1>
        </div>
        <User name="admin"/>
      </Header>
    )
);

HeaderComponent.CSS = css;

export default withRouter(HeaderComponent);