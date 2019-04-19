import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { cssMQ } from '../../utils';

import css from './Page.scss';

const Page = ({ bannerImage, bannerImageMob, className, children }) => {
  return (
    <div className={classNames(css.page, className)}>
      <div className={css.banner} style={{'backgroundImage': `url("${cssMQ.isMobile() ? bannerImageMob : bannerImage}")`}}></div>

      <div className={css.pageContainer}>
        {children}
      </div>
    </div>
  )
};

Page.defaultProps = {
  className: ''
};

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
  bannerImage: PropTypes.string.isRequired,
  bannerImageMob: PropTypes.string.isRequired,
};

export default Page;