import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MODE } from '../../redux/reducers/cart';
import actions from '../../redux/actions/cart';

import css from './QuantityInput.scss';

const QuantityInput = ({ baseClass, itemId, itemQuantity, changeQuantity }) => {
  const targetClass = baseClass ? baseClass : "quantity-item-input";

  return (
    <div className={css.quantityItemInput}>
      <input
        value={itemQuantity}
        onChange={e => changeQuantity(null, itemId, e.target.value)}
        onBlur={e => {
          if (+(e.target.value) === 0) changeQuantity(null, itemId, 1);
        }}
      />
      <div className={css.actions}>
        <span className={css.up} onClick={() => changeQuantity(MODE.up, itemId)}></span>
        <span className={css.down} onClick={() => changeQuantity(MODE.down, itemId)}></span>
      </div>
    </div>
  );
}

QuantityInput.propTypes = {
  itemId: PropTypes.string.isRequired,
  changeQuantity: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({
    changeQuantity: (mode, id, value = null) => dispatch(actions.changeQuantity(mode, id, value)),
  }),
)(QuantityInput);