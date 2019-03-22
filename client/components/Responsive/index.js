import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as css from './Responsive.scss';

const Responsive = ({ children, query }) => {
	const [isMatching, setMatching] = useState(Responsive.isMatching(query));
	const onWindowResize = () => setMatching(Responsive.isMatching(query));

	useEffect(() => {
		window.addEventListener('resize', onWindowResize);
		return function cleanup() {
			window.removeEventListener('resize', onWindowResize);
		};
	}, [isMatching]);

	return isMatching && children;
};

Responsive.isMatching = query => !!window.matchMedia(query).matches;

Responsive.MOBILE = css.mobile;
Responsive.DESKTOP = css.desktop;

Responsive.defaultProps = {
	query: Responsive.DESKTOP,
	children: null
};

Responsive.propTypes = {
	query: PropTypes.oneOf([Responsive.MOBILE, Responsive.DESKTOP]),
	children: PropTypes.node
};

export default Responsive;
