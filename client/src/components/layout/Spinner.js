import React, { Fragment } from 'react';
import spinner from './Spinner.jpg';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '200px',
        margin: 'auto',
        display: 'block',
      }}
      alt='Loading...'
    />
  </Fragment>
);
