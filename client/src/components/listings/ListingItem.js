import React from 'react';
import { Link } from 'react-router-dom';
export const ListingItem = ({ item }) => {
  return (
    <div class='col-lg-4 col-md-6'>
      <div class='card my-4'>
        <img
          src={process.env.PUBLIC_URL + `img/${item.img}`}
          class='card-img-top img-fluid img-thumbnail'
          alt='loading,,,,'
        />
        <div class='card-body'>
          <a style={{ textDecoration: 'none' }}>
            <h5 class='card-title text-center'>
              {' '}
              <Link to={`listing/${item._id}`}>{item.name}</Link>{' '}
            </h5>
          </a>
          <hr />
          <div class='d-flex text-dark '>
            <h5 class='mr-auto'>Current Bid </h5>
            <h5 class='ml-auto'>
              {item.bids.length === 0
                ? `${item.startingBid}`
                : `${item.bids[item.bids.length - 1].bid}`}{' '}
              $
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
