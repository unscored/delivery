import React from 'react';
import PropTypes from 'prop-types';
import decorator from '../../redux/decorators/params';

const Params = (props) => {
  const { setActiveParams, items, itemId } = props;
  return (
    <div className="properties-list">
      {
        items.map((item, i) => (
          <div className="props-set" key={i}>
            <p>{item.name}:</p>
            <ul>
              {
                item.values.map((p, i) => (
                  <li
                    className={p.isSelected ? "prop-item active" : "prop-item"}
                    onClick={() => {
                      const { id: propId } = item;
                      const { id: valId } = p;
                      const result = { id: itemId, data: { [propId]: valId } };
                      setActiveParams(result)}}
                    key={i}
                  >
                    {p.value}
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  )
};

Params.propTypes = {
  itemId: PropTypes.string.isRequired,
  items: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      price: PropTypes.string,
    })),
  })).isRequired,
  setActiveParams: PropTypes.func.isRequired,
};

export default decorator(Params);