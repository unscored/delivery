import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as css from './Footer.scss';

const Footer = ({ className, children }) => {
	return <div className={classNames(css.footer, className)}>{children}</div>;
};

Footer.defaultProps = {
	className: '',
	children: <div />
};

Footer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node
};

export default Footer;
