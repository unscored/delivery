import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import PropTypes from 'prop-types';

import Params from './Params';
export default class ProductItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      properties: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    onPress: PropTypes.func.isRequired,
    activeProps: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    cartItemID: PropTypes.string.isRequired,
    activePropsNamed: PropTypes.array.isRequired,
    activePropsIDs: PropTypes.array.isRequired,
  }

  onCLick = () => {
    const {
      item,
      onPress,
      price,
      cartItemID,
      activePropsNamed,
      activePropsIDs,
    } = this.props;

    onPress({
      id: item.id,
      image: item.image,
      name: item.name,
      selectedProps: activePropsNamed,
      selectedPropsID: activePropsIDs,
      price,
      cartId: `${item.id}${cartItemID}`
    }); 
  }
  
  render() {
    const {
      item,
      activeProps,
      price,
    } = this.props;

    return (
      <div className="product">
        <div className="img">
          <img src={item.image} alt=""/>
        </div>

        <div className="title">
          <h3>{item.name}</h3>
        </div>

        <div className="description">
          <p>{item.description}</p>
        </div>

        <div className="bottom">
          <Params
            itemId={item.id}
            items={activeProps}
          />

          <div className="price">
            <p>{price} {I18n.t('currency')}.</p>
          </div>
        
        </div>

        <div className="add-to-cart">
          <div
            className="btn"
            onClick={this.onCLick}
          >
            {I18n.t('addToCart')}
          </div>
        </div>
      </div>
    );
  }
}
