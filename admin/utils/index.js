export const guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + "-" + s4() + s4();
}

export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) return undefined;
    return JSON.parse(serializeState);
  } catch(err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
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
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return new Date(date).toLocaleString("ru", opt);
}