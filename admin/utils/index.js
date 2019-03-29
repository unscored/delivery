import { STATUS_TYPE } from '../constants';

export const guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + "-" + s4() + s4();
}

export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('adminState');
    if (serializeState === null) return undefined;
    return JSON.parse(serializeState);
  } catch(err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('adminState', serializeState);
  } catch(err) {
    // log errors
  }
}

/**
 * 
 * @param {String} date 
 * @returns {String}
 */
export const parseDate = date => {
  const opt = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
  };

  return new Date(date).toLocaleString("ru", opt);
}

/**
 * 
 * @param {Number} type 
 * @returns {String}
 */
export const getStatusTypeByConstant = t => type => {
  switch (type) {
    case STATUS_TYPE.new:
      return t.t('statusTypes.new');
    case STATUS_TYPE.ready:
      return t.t('statusTypes.ready');
    case STATUS_TYPE.processing:
      return t.t('statusTypes.processing');
    case STATUS_TYPE.closed:
      return t.t('statusTypes.closed');
    case STATUS_TYPE.rejected:
      return t.t('statusTypes.rejected');
    case STATUS_TYPE.returned:
      return t.t('statusTypes.returned');
    default:
      return t.t('statusTypes.undefinedType');
  }
}

/**
 * 
 * @param {Array} data 
 * @returns {Array<String>}
 */
export const getOrderItems = t => data => {
  let string = '';
  const result = data.reduce((acc, item) => {
    string = `${item.type}: ${item.name}. ${item.quantity} ${t.t('countTitle')}`;

    const params = item.params.reduce((res, prop) => {
      res = res ? `${res}, ${prop.name}: ${prop.value}` : `${prop.name}: ${prop.value}`;
      return res;
    }, '');

    acc.push(`${string} ${params} - ${item.price} ${t.t('currency')}`);

    return acc;
  }, []); 
  return result;
}
