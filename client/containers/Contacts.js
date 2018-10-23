import React from 'react';

import ParamsRow from '../components/ParamsRow';
import withScrollTop from '../components/decorators/withScrollTop';

const Contacts = () => (
  <div className="contacts-page">
    <div className="banner banner-contacts"></div>
    <div className="container">
      <ParamsRow />
      Контакты
    </div>
  </div>
  
);

export default withScrollTop(Contacts);
