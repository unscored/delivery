import * as css from '../styles/_variables.scss';

export const DESKTOP = css.desktop;
// export const NON_DESKTOP = css.nonDesktop;
// export const TABLET = css.tablet;
// export const TABLET_PORTRAIT = css.tabletPortrait;
// export const TABLET_LANDSCAPE = css.tabletLandscape;
export const MOBILE = css.mobile;
// export const MOBILE_LANDSCAPE = css.mobileLandscape;
// export const NON_MOBILE = css.nonMobile;

export const isMatching = query => window.matchMedia(query).matches;
export const isMobile = () => isMatching(MOBILE);
// export const isTablet = () => isMatching(TABLET);
export const isDesktop = () => isMatching(DESKTOP);
// export const isNonDesktop = () => isMatching(NON_DESKTOP);
// export const isTabletPortrait = () => isMatching(TABLET_PORTRAIT);