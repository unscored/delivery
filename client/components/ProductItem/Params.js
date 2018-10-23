import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import decorator from '../../redux/decorators/params';

import css from './ProductItem.scss';

class Params extends Component {
  static propTypes = {
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

  renderSetValues = (item) => {
    const { setActiveParams, itemId } = this.props;

    return (
      item.values.map((p, i) => (
        <li
          className={p.isSelected ? classNames(css.propItem, css.active) : css.propItem}
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
    );
  }

  renderPropsSet = () => {
    const { items } = this.props;
  
    return (
      items.map((item, i) => (
        <div className={css.propsSet} key={i}>
          <p>{item.name}:</p>
          <ul>
            {this.renderSetValues(item)}
          </ul>
        </div>
      ))
    );
  }

  render() {
    return (
      <div>
        {this.renderPropsSet()}
      </div>
    )
  }
}

export default decorator(Params);