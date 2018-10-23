import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-redux-i18n';

import css from './ParamsRow.scss';

const ParamsRow = (props) => {
  const { menuItems, onPressMenuBtn, show } = props;

  return (
    <div className={css.paramsRow}>
      {/* <p>hi</p>
      <p>hi2</p> */}
    </div>
  );
}

ParamsRow.propTypes = {
};

ParamsRow.defaultProps = {
};

export default ParamsRow;