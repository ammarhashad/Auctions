import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import {
  getSingleListing,
  newBid,
  newComment,
  toggleWatchlist,
  closeBid,
  deleteListing,
} from '../../actions/listing';
import Moment from 'react-moment';

import { withRouter } from 'react-router-dom';

const SingleListing = ({
  match,
  getSingleListing,
  deleteListing,
  newBid,
  closeBid,
  newComment,
  toggleWatchlist,
  listing,
  history,
  loading,
  auth: { user },
}) => {
  useEffect(() => {
    getSingleListing(match.params.id);
  }, [getSingleListing]);

  const [formData, setformData] = useState({
    bid: '',
    comment: '',
  });
  const { bid, comment } = formData;
  const onChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const Delete = e => {
    e.stopPropagation();
    deleteListing(listing._id, history);
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <section className='container mb-4'>
        <div className='card mb-4 py-3'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='text-center pt-2'>
                <h3>
                  status :{' '}
                  {listing.active ? (
                    <span className='text-success'>Active</span>
                  ) : (
                    <span className='text-danger'>Closed</span>
                  )}
                </h3>
              </div>
            </div>
            <div className='col-lg-4'>
              {user._id === listing.author && (
                <button
                  onClick={e => {
                    Delete(e);
                  }}
                  className='btn btn-danger btn-block '
                >
                  Delete Listing
                </button>
              )}
            </div>
            <div className='col-lg-4'>
              <div className='text-right mr-4'>
                {
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation();
                      toggleWatchlist(listing._id);
                    }}
                    className={`${
                      user.watchList.filter(
                        item => item.listing === listing._id
                      ).length > 0
                        ? 'text-primary'
                        : 'text-dark'
                    }`}
                  >
                    <i
                      className='fas fa-star fa-3x'
                      title='Add To Watchlist'
                    ></i>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-8'>
            <div className='card mb-3' style={{ 'max-width': '680px' }}>
              <div className='row no-gutters'>
                <div className='col-md-7'>
                  <img
                    src={process.env.PUBLIC_URL + `/img/${listing.img}`}
                    id='product-img'
                    alt='...'
                  />
                </div>
                <div className='col-md-5'>
                  <div className='card-body'>
                    <h4 className='card-title text-center'>{listing.name}</h4>
                    <hr />
                    <p className='card-text'>
                      <strong>description:</strong> {listing.desc}
                    </p>
                    <hr />
                    <div className='d-flex'>
                      <p className='mr-auto'>
                        <strong>Starting Bid :</strong>
                      </p>
                      <p className='ml-auto'>
                        <strong>{listing.startingBid}$</strong>
                      </p>
                    </div>
                    <hr />
                    <div className='d-flex'>
                      <p className='mr-auto'>
                        <strong>
                          {listing.active ? 'Current Bid' : 'Last Bid'} :
                        </strong>
                      </p>
                      <p className='ml-auto'>
                        <strong>
                          {listing.bids.length > 0
                            ? `${listing.bids[listing.bids.length - 1].bid}`
                            : `${listing.startingBid}`}
                          $
                        </strong>
                      </p>
                    </div>
                    <hr />
                    {listing.active ? (
                      user._id !== listing.author ? (
                        <form
                          onSubmit={e => {
                            e.preventDefault();

                            newBid(listing._id, bid);
                            setformData({ bid: '' });
                          }}
                        >
                          <div className='row'>
                            <div className='col-8'>
                              <div className='input-group'>
                                <div className='input-group-prepend'>
                                  <span className='input-group-text'>$</span>
                                </div>
                                <input
                                  type='text'
                                  name='bid'
                                  value={formData.bid}
                                  onChange={e => onChange(e)}
                                  className='form-control'
                                  aria-label='Amount (to the nearest dollar)'
                                />
                              </div>
                            </div>
                            <div className='col-4'>
                              <button className='btn btn-primary btn-block'>
                                Bid
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            closeBid(listing._id);
                          }}
                          className='btn btn-success btn-block'
                        >
                          Close bid
                        </button>
                      )
                    ) : (
                      <h4 className='text-success '>
                        {listing.bids[listing.bids.length - 1].bidder} Won the
                        Bid
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='card'>
              <div className='comment-section scrollable'>
                {listing.comments.length > 0
                  ? listing.comments.map(comment => (
                      <div className='card'>
                        <div className='card-text'>
                          <p className=''>
                            <strong className='text-primary'>
                              {comment.name} :{' '}
                            </strong>
                            {comment.text}
                          </p>
                        </div>
                        <div id='date' className='card-text text-right'>
                          <small className='text-muted'>
                            {' '}
                            <Moment parse='YYYY-MM-DD HH:mm'>
                              {comment.date}
                            </Moment>
                          </small>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                newComment(listing._id, comment);
                setformData({ comment: '' });
              }}
            >
              <div className='form-group mt-3'>
                <textarea
                  name='comment'
                  value={comment}
                  onChange={e => onChange(e)}
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='5'
                ></textarea>
                <button className='btn btn-primary btn-block my-2'>
                  Leave A Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
};

SingleListing.propTypes = {
  listing: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing.singleListing,
  loading: state.listing.loading,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getSingleListing,
  newBid,
  newComment,
  toggleWatchlist,
  closeBid,
  deleteListing,
})(withRouter(SingleListing));
