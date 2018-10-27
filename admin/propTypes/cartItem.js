import PropTypes from 'prop-types';

const cartItemTypes = PropTypes.shape({
  id: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  selectedProps: PropTypes.array,
  selectedPropsID: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  name: PropTypes.string,
  cartId: PropTypes.string,
}).isRequired;

export default cartItemTypes;