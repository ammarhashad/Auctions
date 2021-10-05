import React from 'react';

function Pagination({ listings, postsPerPage, changePage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(listings.length / postsPerPage) + 1; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label='...' className='my-3'>
      <ul class='pagination pagination-md justify-content-center'>
        {pageNumbers.map(number => (
          <li
            aria-current='page'
            className={`page-item ${number === currentPage ? 'active' : ''}`}
          >
            <a
              className='page-link'
              onClick={() => {
                changePage(number);
                window.scrollTo(0, 0);
              }}
            >
              {' '}
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
