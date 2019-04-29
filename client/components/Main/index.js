import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { analytics } from '../../utils';
import ParamsRow from '../ParamsRow';
import ProductItem from '../ProductItem';
import withSelectedItems from '../../redux/decorators/withSelectedItems';
import List from '../List';
import Page from '../Page';
import withScrollTop from '../decorators/withScrollTop';

import banner from '../../images/main-page-2500x600.jpg';
import bannerMob from '../../images/main-page-2500x600_mobile.jpg';

import css from './Main.scss';

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
    
    analytics.onMain();
  }

  renderProductItem = ({item}) => (
    <Product
      item={item}
      onPress={cartItem => {
        analytics.onAddToCart(cartItem);
        this.props.addToCart(cartItem);
      }}
    />
  );

  render() {
    const { products: { items } } = this.props;

    return (
      <Page
        bannerImage={banner}
        bannerImageMob={bannerMob}
      >
        <ParamsRow />
          <List
            classNameCss={css.productsList}
            ListItem={this.renderProductItem}
            items={items}
            keyExtractor={item => item.id}
          />
      </Page>
    )
  }
};