

export const constants = {
  getClientsStart: 'GET_CLIENTS_START',
  getClientsSuccess: 'GET_CLIENTS_SUCCESS',
  getClientsFail: 'GET_CLIENTS_FAIL',
};

const model = {
  fetched: false,
  fetching: false,
  items: [],
  error: null,
};

export default function (state = model, action) {

  switch(action.type) {
    case constants.getClientsStart: {
      return { ...state, fetching: true };
    }

    case constants.getClientsSuccess: {
      const { payload } = action;
      return { ...state, fetching: false, fetched: true, items: payload.result };
    }

    case constants.getClientsFail: {
      const { payload } = action;
      return { ...state, fetching: false, error: payload, fetched: false, items: [] };
    }

    default:
    return state;
  }
}