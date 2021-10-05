import React from 'react';

export const Footer = () => {
  return (
    <footer id='main-footer' class=''>
      <div class='container py-3'>
        <div class='row'>
          <div class='col text-center pt-4'>
            <h5
              style={{
                'font-family': 'Allison, cursive',
                'font-size': 'xx-large',
              }}
            >
              AUCTIONS
            </h5>
            <p>
              Copyright &copy;
              <span id='year'>2021</span>
            </p>
            <button
              class='btn btn-primary'
              data-toggle='modal'
              data-target='#contactModal'
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
