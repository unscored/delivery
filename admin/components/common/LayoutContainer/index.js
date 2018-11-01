import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import css from './LayoutContainer.scss';

const LayoutContainer = ({ className, title, children }) => (
  <div className={classNames('layoutContainer', className)}>
    <div className={css.title}>
      <h1>{title}</h1>
    </div>
    <div className={classNames('layoutContainerContent', className ? `${className}Content` : '')}>
      {children}
    </div>
  </div>
);

LayoutContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default LayoutContainer;