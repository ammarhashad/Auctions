import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

export const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStatetoProps = state => ({
  auth: state.auth,
});

export default connect(mapStatetoProps)(PrivateRoute);
