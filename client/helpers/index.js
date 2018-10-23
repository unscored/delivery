import { findIndex, isEmpty } from 'lodash';

/**
 * 
 * @param {Array} arr 
 * @param {Number} index
 * 
 * @returns {Array} result 
 */
const getTargetPropValues = (arr, index) => {
  let result = arr.map((v, i) => {
    let k = { ...v };
    if (i === index) k.isSelected = true;
    else k.isSelected = false;
    return k;
  });
  
  return result;
}

/**
 * 
 * @param {Array} array
 * 
 * @returns {Array} 
 */
export const joinNamesWithValues = (array) => {
  let result = array.reduce((acc, item) => {
    let index = findIndex(item.values, v => v.isSelected);
    return [...acc, `${item.name}: ${item.values[index].value}`];
  }, []);
  return result;
}

/**
 * 
 * @param {Array} array
 * 
 * @returns {Array<String>} 
 */
export const getActivePropsIDs = (array) => {
  let result = array.reduce((acc, item) => {
    let index = findIndex(item.values, v => v.isSelected);
    acc.push(item.values[index].id);
    return acc;
  }, []);
  return result;
}

/**
 * 
 * @param {Array} array 
 * 
 * @returns {String}
 */
export const getIdFromActiveProps = (array) => {
  let result = array.reduce((acc, item) => {
    return acc + item.id + item.values.reduce((accVal, val) => {
      if (val.isSelected) {
        return accVal + val.id;
      }
      return accVal;
    }, '');
  }, '');
  return result;

}

/**
 * 
 * @param {Array} props 
 * 
 * @returns {Array}
 */
const getDefValues = props => {
  return props.map(p => {
    let k = { ...p };
    let targetValues = getTargetPropValues(k.values, 0);
    k.values = [...targetValues];
    return k;
  });
}

/**
 * 
 * @param {String} productPrice
 * @param {Array} props
 * 
 * @returns {Number}
 */
export const getProductPrice = props => {
  const price = props.reduce((acc, item) => {
    return acc + item.values.reduce((accVal, val) => {
      if (val.isSelected) {
        return accVal + parseInt(val.price);
      }
      return accVal;
    }, 0);
  }, 0);
  return price;
}

/**
 * 
 * @param {Object} obj
 * @param {Array} props
 * 
 * @returns {Array} result
 */
export const prepareProps = (obj = {}, props) => {
  let result = [];

  if (isEmpty(obj)) {
    result = getDefValues(props);
  } else {
    result = getDefValues(props);

    for (let key in obj) {
      let propIndex = findIndex(result, p => p.id == key );
      let valIndex = findIndex(result[propIndex].values, v => v.id == obj[key] );
      let targetValues = getTargetPropValues(result[propIndex].values, valIndex);

      result[propIndex] = { ...props[propIndex] };
      result[propIndex].values = targetValues;
    }
  }
  return result;
}

export default {
  getProductPrice,
  prepareProps,
  getIdFromActiveProps,
}