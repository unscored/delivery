import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as css from './Header.scss';

const Header = ({ className, title }) => {
	return (
		<div className={classNames(css.header, className)}>
			<p className={css.headerTitle}>{title}</p>
		</div>
	);
};

Header.defaultProps = {
	className: '',
	title: ''
};

Header.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string
};

export default Header;
