import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import Name from './Name';
import Phone from './Phone';
import Address from './Address';

import css from './UserInfoForm.scss';


const UserInfoForm = () => {

  return (
    <div className={css.userInfo}>
      <div className={css.title}>
        <h3>{I18n.t('contactsDataTitle')}</h3>
      </div>
      <div className={css.form}>
        <div className={css.item}><Name /></div>
        <div className={css.item}><Phone /></div>
        <div className={css.item}><Address /></div>
      </div>
    </div>
  )
}

UserInfoForm.propTypes = {

};

export default UserInfoForm;
