import axios from 'axios';
import {
  GET_CATEGORY,
  GET_LISTINGS,
  GET_SINGLE,
  GET_WATCHLIST,
  UPDATE_SINGLE,
  UPDATE_USER,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../reducers/utils/setAuthToken';
export const getAllListings = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.get('api/listing', config);
    dispatch({
      type: GET_LISTINGS,
      payload: res.data,
    });
  } catch (err) {
    console.log('Server error');
  }
};

export const getSingleListing = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listing/${id}`);
    dispatch({
      type: GET_SINGLE,
      payload: res.data,
    });
  } catch (err) {
    console.log('Server error');
  }
};

export const newBid = (id, bid) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ bid: Number(bid) });
  try {
    const res = await axios.post(`/api/listing/${id}/bid`, body, config);
    dispatch({
      type: UPDATE_SINGLE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const newComment = (id, comment) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ comment });
  try {
    const res = await axios.post(`/api/listing/${id}/comment`, body, config);
    dispatch({
      type: UPDATE_SINGLE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const toggleWatchlist = id => async dispatch => {
  try {
    const res = await axios.put(`/api/listing/${id}/watchlist`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log('Server error');
  }
};

export const closeBid = id => async dispatch => {
  try {
    await axios.put(`/api/listing/${id}/closebid`);
    setTimeout(() => {
      dispatch(getSingleListing(id));
    }, 500);
    dispatch(setAlert('Bid Closed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const deleteListing = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/listing/${id}/delete`);
    dispatch(setAlert('Listing Deleted', 'success'));
    history.push('/');
  } catch (err) {
    console.log('Server Error');
  }
};

export const getWatchlist = () => async dispatch => {
  try {
    setAuthToken(localStorage.token);
    const res = await axios.get('/api/listing/user/watchlist');
    dispatch({
      type: GET_WATCHLIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const addListing = (formData, history) => async dispatch => {
  try {
    await axios.post('/api/listing', formData);
    history.push('/');
    dispatch(setAlert('Listing added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getCategory = category => async dispatch => {
  try {
    setAuthToken(localStorage.token);
    const res = await axios.get(`/api/listing/categories/${category}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
