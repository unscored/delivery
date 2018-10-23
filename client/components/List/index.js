import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItemDefault from './ListItem';

export default class List extends Component {
  static propTypes = {
    classNameCss: PropTypes.string,
    ListItem: PropTypes.func,
    renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    keyExtractor: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.any),
  };
  
  static defaultProps = {
    classNameCss: 'list',
    items: [],
    ListItem: ListItemDefault,
    renderItem: false,
    keyExtractor: (item, key) => item.id || key,
  };

  get items() {
    const { items } = this.props;
    return items;
  }

  render() {
    const { ListItem, renderItem, keyExtractor, classNameCss } = this.props;
    return (
      <div className={classNameCss}>
        {this.items.map((item, key) => {
          if (renderItem) {
            return <div key={keyExtractor(item, key)}>{renderItem({ item })}</div>;
          }
          return (<ListItem key={keyExtractor(item, key)} item={item}
          />);
        })}
      </div>
    );
  }
}
