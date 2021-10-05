import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FixedNavbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import Alert from './components/layout/Alert';
import ScrollToTop from './components/routing/ScrollToTop';
import Login from './components/auth/Login';
import AllListings from './components/listings/AllListings';
import SingleListing from './components/listings/SingleListing';
import PrivateRoute from './components/routing/PrivateRoute';
import ActiveListings from './components/listings/ActiveListings';
import Watchlist from './components/listings/Watchlist';
import { Footer } from './components/layout/Footer';
import NewListing from './components/listings/NewListing';
import MyListings from './components/listings/MyListings';
import Categories from './components/listings/Categories';
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Fragment>
            <FixedNavbar />
            <section id='home-section'>
              <Alert />
              <Switch>
                <Route exact path='/' component={AllListings} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route
                  exact
                  path='/active-listings'
                  component={ActiveListings}
                />
                <Route exact path='/categories' component={Categories} />
                <PrivateRoute
                  exact
                  path='/listing/:id'
                  component={SingleListing}
                />
                <PrivateRoute exact path='/watchlist' component={Watchlist} />
                <PrivateRoute
                  exact
                  path='/add-listing'
                  component={NewListing}
                />
                <PrivateRoute
                  exact
                  path='/my-listings'
                  component={MyListings}
                />
              </Switch>
            </section>
            <Footer />
          </Fragment>
        </ScrollToTop>
      </Router>
    </Provider>
  );
};

export default App;
