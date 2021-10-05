import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  alerts: [],
  sent: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: payload,
        sent: false,
      };
    case REMOVE_ALERT:
      return { state: [], sent: true };
    default:
      return state;
  }
}
