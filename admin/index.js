import React from 'react';
import { render } from 'react-dom';

// import './styles/antd.less';

import App from './App';

const renderApp = (Root) => {
	render(
		<Root />,
		document.getElementById('root')
	);
};

window.addEventListener('load', () => {
	const preloadingScreen = document.querySelector('.preloading-screen');

	renderApp(App);

	if (preloadingScreen) {
		preloadingScreen.addEventListener('transitionend', e => {
			if (e.target === preloadingScreen) {
				preloadingScreen.remove();
			}
		});
		preloadingScreen.style.opacity = 0;
	}
});