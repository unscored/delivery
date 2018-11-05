import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import LayoutContainer from '../common/LayoutContainer';



export default class Main extends Component {
  render() {
    return (
      <LayoutContainer title={I18n.t('routesNames.main')}>
        данные
      </LayoutContainer>
    );
  }
}

Main.propTypes = {

};
