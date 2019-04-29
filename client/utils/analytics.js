import ReactGA from 'react-ga';
import { IS_DEV } from '../constants';


let options = {};

if (IS_DEV) {
	options = { 'debug': false };
}

export const tracker = {
	'init': function init(id) {
		if (typeof window === 'undefined') {
			return;
		}
		if (!id) {
			console.warn('There is no google analytics ID.');
			return;
		}
		if (IS_DEV) { console.log('init', id); }
		ReactGA.initialize(id, options);
	},
	'pageview': function pageview(...args) {
		if (IS_DEV) { console.log('pageview', ...args); }
		ReactGA.pageview(...args);
	},
	'event': function event(...args) {
		if (IS_DEV) { console.log('event', ...args); }
		ReactGA.event(...args);
	},
	'ga': function ga(args) {
		if (IS_DEV) { console.log('ga', ...args); }
		ReactGA.ga(...args);
	},
};

export function track({ type, payload }) {
	try {
		tracker[type](payload);
	} catch (error) {
		if (IS_DEV) {
			console.warn('Failed to track analytics event', error);
		}
	}
}

export const analytics = {
	'onContacts': () => track({
		type: 'ga',
		payload: ['send', 'pageview', '/contacts-page'],
	}),
	'onMain': () => track({
		type: 'ga',
		payload: ['send', 'pageview', '/main-page'],
	}),
	'onCart': () => track({
		type: 'ga',
		payload: ['send', 'pageview', '/cart-page'],
	}),
	'onAddToCart': item => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Add item to the cart', 'label': `${item.name}. ${item.selectedProps.join(', ')}` },
  }),
  'createOrder': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Create new order' },
	}),
};
