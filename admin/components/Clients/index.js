import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import LayoutContainer from '../common/LayoutContainer';

export default class Clients extends Component {
  render() {
    return (
      <LayoutContainer title={I18n.t('routesNames.clients')}>
        данные
      </LayoutContainer>
    );
  }
}

Clients.propTypes = {

};
