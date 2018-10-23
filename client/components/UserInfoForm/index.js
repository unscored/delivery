import React from 'react';
import PropTypes from 'prop-types';

import Name from './Name';
import Phone from './Phone';
import Address from './Address';
import { I18n } from 'react-redux-i18n';

const UserInfoForm = () => {

  return (
    <div className="user-info">
      <div className="user-info__title">
        <h3>{I18n.t('contactsDataTitle')}</h3>
      </div>
      <div className="user-info__form">
        <div className="user-info__form__item"><Name /></div>
        <div className="user-info__form__item"><Phone /></div>
        <div className="user-info__form__item"><Address /></div>
      </div>
    </div>
  )
}

UserInfoForm.propTypes = {

};

export default UserInfoForm;
