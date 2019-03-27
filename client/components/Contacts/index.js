import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';

import banner from '../../images/contacts-page-2500x600.jpg';
import map from '../../images/map.jpg';

import css from './Contacts.scss';
import { CONTACT_PHONE, INSTA_URL, CONTACT_CITY, ADDRESS_STRING } from '../../constants';


export default class Cart extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div>
        <div className="banner" style={{'backgroundImage': `url("${banner}")`}}></div>
        <div className="container">
          <div className={css.contactsContent}>
            <div className={css.mapWrap}>
              <div className={css.map} style={{'backgroundImage': `url("${map}")`}} />
            </div>
            <div className={css.info}>
              <div className={css.infoItem}>
                <div className={css.infoItemTitle}>
                  <h3>{I18n.t('contacts')}</h3>
                </div>
                <div className={css.infoItemContent}>
                  <div className={css.contacts}>
                    <p>{`${I18n.t('tel')}: `} <span>{`${CONTACT_PHONE}`}</span></p>
                    <p>{`${I18n.t('instagram')}: `}<span><a href={INSTA_URL} target="_blank">cafe_belvedere</a></span></p>
                  </div>
                </div>
              </div>
              <div className={css.infoItem}>
                <div className={css.infoItemTitle}>
                  <h3>{I18n.t('ourAddress')}</h3>
                </div>
                <div className={css.infoItemContent}>
                  <p>{CONTACT_CITY}</p>
                  <p>{ADDRESS_STRING}</p>
                </div>
              </div>
              <div className={css.infoItem}>
                <div className={css.infoItemTitle}>
                  <h3>{I18n.t('workHours')}</h3>
                </div>
                <div className={css.infoItemContent}>
                  <p>Пн-Пт: 9:00 - 21:00</p>
                  <p>Выходные: Сб, Вс</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}