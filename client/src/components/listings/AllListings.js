import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllListings } from '../../actions/listing';
import ListingItem from './ListingItem';
import Spinner from '../layout/Spinner';
import Pagination from '../layout/Pagination';
export const AllListings = ({
  getAllListings,
  listing: { listings, loading },
}) => {
  useEffect(() => {
    getAllListings();
  }, []);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const posts = listings.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = pageNumber => {
    setcurrentPage(pageNumber);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <div className='row'>
        {posts.map(singleItem => (
          <ListingItem item={singleItem} key={singleItem.id} />
        ))}
      </div>
      <Pagination
        listings={listings}
        postsPerPage={postPerPage}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, { getAllListings })(AllListings);
