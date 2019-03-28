import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import * as css from './PopUp.scss';

const PopUp = ({ className, content, visible }) => {
	return ReactDOM.createPortal(
		<div className={classNames(css.popUp, className, { [css.visible]: visible })}>{content}</div>,
		document.querySelector('.popup-manager')
	);
};

PopUp.propTypes = {
	className: PropTypes.string,
	visible: PropTypes.bool,
	content: PropTypes.node
};

PopUp.defaultProps = {
	className: '',
	visible: false,
	content: <div />
};

export default PopUp;

export Header from './Header';
export Footer from './Footer';
