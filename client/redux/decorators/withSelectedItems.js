import React from 'react';
import { connect } from  'react-redux';
import { findIndex } from 'lodash';

import {
  getProductPrice,
  prepareProps,
  getIdFromActiveProps,
  joinNamesWithValues,
  getActivePropsIDs,
} from '../../helpers';

const decorator = connect( ({ selectedItems }) => ({ selectedItems }) );

const HOC = decorator(({ selectedItems, item, component: Component, ...props }) => {
  const index = findIndex(selectedItems, s => s.id === item.id);
  const targetSelectedItems = index >= 0 ? selectedItems[index].data : {};
  const activeProps = prepareProps(targetSelectedItems, item.properties);
  const activePropsNamed = joinNamesWithValues(activeProps);
  const activePropsIDs = getActivePropsIDs(activeProps);
  const price = getProductPrice(activeProps, item.price);
  const cartItemID = getIdFromActiveProps(activeProps);

  return (
    <Component
      item={item}
      {...props}
      activeProps={activeProps}
      price={price}
      cartItemID={cartItemID}
      selectedItems={selectedItems}
      activePropsNamed={activePropsNamed}
      activePropsIDs={activePropsIDs}
    />
  );
});

export default component => props => <HOC {...props} component={component} />;