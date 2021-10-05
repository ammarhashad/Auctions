import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllListings, getCategory } from '../../actions/listing';
import ListingItem from './ListingItem';
import Spinner from '../layout/Spinner';
import Pagination from '../layout/Pagination';
export const AllListings = ({
  getAllListings,
  getCategory,
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
  const categories = [
    'Electronics',
    'Home and Kitchen',
    'Computers',
    'Smart Home',
    'Arts & Crafts',
    'Automotive',
    'Software',
    'Video Games',
  ];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <div className='row' id='category'>
        {categories.map(category => (
          <div className='col-md-3 mb-3'>
            <button
              onClick={async e => {
                e.stopPropagation();
                await getCategory(category);
                if (window.innerWidth < 480) {
                  window.scroll(0, 490);
                } else {
                  window.scroll(0, 190);
                }
              }}
              key={category}
              className='btn btn-primary btn-block py-2'
            >
              {category}
            </button>
          </div>
        ))}
      </div>
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

export default connect(mapStateToProps, { getAllListings, getCategory })(
  AllListings
);
