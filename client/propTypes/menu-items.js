import PropTypes from 'prop-types';

export const menuItemType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  path: PropTypes.string,
});

export const menuItemsType = PropTypes.arrayOf(menuItemType);