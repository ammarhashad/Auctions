import {
  GET_LISTINGS,
  GET_SINGLE,
  UPDATE_SINGLE,
  DELETE_LISTING,
  GET_WATCHLIST,
  LOG_OUT,
  GET_CATEGORY,
} from '../actions/types';

const initialState = {
  watchlist: [],
  listings: [],
  loading: true,
  singleListing: {
    bids: [
      {
        bid: 0,
        bidder: '',
      },
    ],
    comments: [
      {
        text: '',
        name: '',
        date: '',
      },
    ],
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTINGS:
    case GET_CATEGORY:
      return {
        ...state,
        listing: [],
        listings: payload,
        loading: false,
      };
    case UPDATE_SINGLE:
    case GET_SINGLE:
      return {
        ...state,
        singleListing: payload,
        loading: false,
      };
    case DELETE_LISTING:
      return {
        ...state,
        singleListing: [],
        loading: false,
      };
    case GET_WATCHLIST:
      return {
        ...state,
        listing: [],
        watchlist: payload,
        loading: false,
      };
    case LOG_OUT:
    default:
      return state;
  }
}
