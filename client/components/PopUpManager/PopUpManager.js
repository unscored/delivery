/* eslint-disable class-methods-use-this */
/* eslint-disable no-else-return */
import * as React from 'react';
import PropTypes from 'prop-types';

import { INFO_POP_UP } from '../../constants';
import PopUp from './PopUp';
import Info from './Info';

/*
 * This is very basic implementation,
 * now it allow use single <PopUp> component for all modal pop-ups of the application
 *
 * TODO: implement pop-up opening from visible pop-up
 */
export default class PopUpManager extends React.Component {
	static propTypes = {
		popUp: PropTypes.shape({
			id: PropTypes.string
		})
	};

	static defaultProps = {
		popUp: {}
	};

	constructor(props) {
		super(props);

		this.state = {
			popUp: { ...props.popUp, visible: !!this.popUpContentMap[props.popUp.id] }
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.popUp.id) {
			return {
				popUp: { ...props.popUp, visible: true }
			};
		} else if (!props.popUp.id && state.popUp.id) {
			return {
				popUp: { ...state.popUp, visible: false }
			};
		}

		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			popUp: { visible }
		} = this.state;

		if (!prevState.popUp.visible && visible) {
			document.getElementsByTagName('body')[0].setAttribute('style', 'overflow: hidden');
		} else if (prevState.popUp.visible && !visible) {
			document.getElementsByTagName('body')[0].removeAttribute('style');
		}
	}

	get popUpContentMap() {
		return {
			[INFO_POP_UP]: Info
		};
	}

	render() {
		const { popUp } = this.state;
		const PopUpContent = this.popUpContentMap[popUp.id];
		const isContentAvailable = !!PopUpContent;

		return (
			<PopUp
				content={isContentAvailable ? <PopUpContent {...popUp.data} /> : null}
				visible={popUp.visible && isContentAvailable}
			/>
		);
	}
}
