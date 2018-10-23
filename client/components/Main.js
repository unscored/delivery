import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ParamsRow from './ParamsRow';
import ProductItem from './ProductItem';
import withSelectedItems from '../redux/decorators/withSelectedItems';
import List from './List';
import withScrollTop from './decorators/withScrollTop';

const Product = withSelectedItems(ProductItem);

@withScrollTop
export default class Main extends PureComponent {
  static propTypes = {
    products: PropTypes.shape({
      items: PropTypes.array,
    }),
    getProducts: PropTypes.func,
    addToCart: PropTypes.func,
  }

  static defaultProps = {
    products: {},
    getProducts: () => {},
    addToCart: () => {},
  }

  componentDidMount() {
    this.props.getProducts(1);
  }

  _renderProductItem = ({item}) => (
    <Product
      item={item}
      onPress={(cartItem) => this.props.addToCart(cartItem)}
    />
  );

  render() {
    const { products: { items } } = this.props;

    return (
      <div className="main-page">
        <div className="banner banner-main"></div>
        <div className="container">
          <ParamsRow />
          <List
            classNameCss="products-list"
            ListItem={this._renderProductItem}
            items={items}
            keyExtractor={item => item.id}
          />
        </div>
      </div>
    )
  }
};