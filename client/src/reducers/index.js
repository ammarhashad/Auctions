import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import listing from './listing';
export default combineReducers({ alert, auth, listing });
