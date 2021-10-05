import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  UPDATE_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: { _id: '', watchList: [] },
  isAuthenticated: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        user: [],
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
