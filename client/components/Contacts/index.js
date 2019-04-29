import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';

import { analytics } from '../../utils';
import Page from '../Page';
import { CONTACT_PHONE, INSTA_URL, CONTACT_CITY, ADDRESS_STRING, WORK_HOURS, DAYS_OFF } from '../../constants';

import banner from '../../images/contacts-page-2500x600.jpg';
import bannerMob from '../../images/contacts-page-2500x600_mobile.jpg';
import map from '../../images/map.jpg';

import css from './Contacts.scss';


export default class Cart extends Component {
  static propTypes = {
  };

  componentDidMount() {
    analytics.onContacts();
  }

  render() {
    return (
      <Page
        bannerImage={banner}
        bannerImageMob={bannerMob}
      >
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
                  <p>{`${I18n.t('tel')}: `} <span><a href={`tel: ${CONTACT_PHONE}`}>{`${CONTACT_PHONE}`}</a></span></p>
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
                <p>{WORK_HOURS}</p>
                <p>{DAYS_OFF}</p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  } 
}