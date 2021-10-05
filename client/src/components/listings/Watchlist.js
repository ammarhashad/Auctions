import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getWatchlist } from '../../actions/listing';
import Pagination from '../layout/Pagination';
import Spinner from '../layout/Spinner';
import ListingItem from './ListingItem';
const Watchlist = ({ loading, watchlist, getWatchlist }) => {
  useEffect(() => {
    getWatchlist();
  }, []);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const posts = watchlist.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = pageNumber => {
    setcurrentPage(pageNumber);
  };

  if (loading === true) {
    return <Spinner />;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          {watchlist.length === 0 ? (
            <div className='col text-center'>
              <h2 className='text-danger'>Your Watchlist is empty</h2>
            </div>
          ) : (
            posts.map(singleItem => (
              <ListingItem item={singleItem} key={singleItem.id} />
            ))
          )}
        </div>
        <Pagination
          listings={watchlist}
          postsPerPage={postPerPage}
          changePage={changePage}
          currentPage={currentPage}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  watchlist: state.listing.watchlist,
  loading: state.listing.loading,
});

export default connect(mapStateToProps, { getWatchlist })(Watchlist);
