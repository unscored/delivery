import React, { Component } from 'react';

import banner from '../../images/contacts-page-2500x600.jpg';

import css from './Contacts.scss';

export default class Cart extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div>
        <div className={css.banner} style={{'background-image': `url("${banner}")`}}></div>
        <div className={css.container}>
          Контакты
        </div>
      </div>
    );
  } 
}