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
  'onShowCartClick': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on show cart button' },
  }),
  'onHeaderLogoClick': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on header logo' },
  }),
  'onMenuIconClick': action => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on menu icon in header', 'label': `${action} side menu` },
  }),
  'onInstaLinkClick': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on insta link in footer' },
  }),
  'onPhoneLinkClick': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on phone number in footer' },
  }),
  'onCartIconClick': action => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on cart icon in header', 'label': `${action} side cart` },
  }),
  'onMenuItemClick': item => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Click on menu item', 'label': item },
  }),
  'createOrder': () => track({
		type: 'event',
		payload: { 'category': 'belvedere', 'action': 'Create new order' },
	}),
};
