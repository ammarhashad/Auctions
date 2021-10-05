import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { withRouter } from 'react-router';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const FixedNavbar = ({ auth: { isAuthenticated, user }, history, logout }) => {
  const LogOut = () => {
    logout(history);
  };
  const userLinks = (
    <NavDropdown
      className='mr-2'
      title={isAuthenticated && <span>{user.name}</span>}
      id='collasible-nav-dropdown'
    >
      <NavDropdown.Item
        eventKey='5'
        className='link btn'
        as={Link}
        to='/add-listing'
      >
        <i className='fas fa-plus mr-2 text-primary'></i>Add listing
      </NavDropdown.Item>
      <NavDropdown.Item
        eventKey='6'
        className='link btn'
        as={Link}
        to='/my-listings'
      >
        <i className='fas fa-money-check-alt mr-2 text-primary'></i>My listings
      </NavDropdown.Item>
      <NavDropdown.Item
        eventKey='7'
        className='link btn'
        as={Link}
        to='/watchlist'
      >
        <i className='fas fa-archive mr-2 text-primary'></i>My Watchlist
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        eventKey='8'
        className='link btn'
        as={Link}
        to='/'
        onClick={LogOut}
      >
        {' '}
        <i className='fas fa-sign-out-alt mr-2 text-primary'></i>Sign Out
      </NavDropdown.Item>
    </NavDropdown>

    // <li className='nav-item dropdown'>
    //   <li className='nav-item dropdown'>
    //     <a
    //       className='nav-link dropdown-toggle'
    //       href='#'
    //       id='navbarDropdown'
    //       role='button'
    //       data-toggle='dropdown'
    //       aria-haspopup='true'
    //       aria-expanded='false'
    //     >
    //       {isAuthenticated && <span>{user.name}</span>}
    //     </a>
    //     <div
    //       class='dropdown-menu px-2 text-center'
    //       aria-labelledby='navbarDropdown'
    //     >
    //       <Link
    //         to='/add-listing'
    //         className='link btn'
    //         data-toggle='collapse'
    //         data-target='#navbarCollapse'
    //       >
    //         <i className='fas fa-plus mr-2 text-primary'></i>
    //         Add listing
    //       </Link>
    //       <hr />
    //       <Link
    //         to='/my-listings'
    //         className='link btn'
    //         data-toggle='collapse'
    //         data-target='#navbarCollapse'
    //       >
    //         <i className='fas fa-money-check-alt mr-2 text-primary'></i>
    //         My listings
    //       </Link>
    //       <hr />
    //       <li className='btn'>
    //         <Link
    //           to='/watchlist'
    //           class='link'
    //           data-toggle='collapse'
    //           data-target='#navbarCollapse'
    //         >
    //           <i className='fas fa-archive mr-2 text-primary'></i>My Watchlist
    //         </Link>
    //       </li>
    //       <hr />
    //       <Link
    //         to='/'
    //         className='link btn'
    //         data-toggle='collapse'
    //         data-target='#navbarCollapse'
    //         onClick={LogOut}
    //       >
    //         <i className='fas fa-sign-out-alt mr-2 text-primary'></i>Sign Out
    //       </Link>
    //     </div>
    //   </li>
    // </li>
  );

  const guestLink = (
    <Nav.Link eventKey='4' as={Link} to='/login'>
      Login
    </Nav.Link>
  );

  return (
    <Fragment>
      <Navbar
        id='main-nav'
        collapseOnSelect
        expand='lg'
        variant='light'
        fixed='top'
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
            style={{ fontFamily: 'Allison, cursive', fontSize: 'xx-large' }}
          >
            <img
              className='rounded img-fluid mb-2'
              src='img/logo.png'
              height='50'
              width='50'
              alt=''
            />
            <span className='ml-2'> Auctions </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link eventKey='1' as={Link} to='/'>
                All Listings
              </Nav.Link>
              <Nav.Link eventKey='2' as={Link} to='/active-listings'>
                Active Listings
              </Nav.Link>
              <Nav.Link eventKey='3' as={Link} to='/categories'>
                Categories
              </Nav.Link>
              {!isAuthenticated ? guestLink : userLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <nav
        className='navbar navbar-expand-sm navbar-light fixed-top'
        id='main-nav'
      >
        <div className='container'>
          <Link
            to='/'
            href='index.html'
            className='navbar-brand'
            style={{ fontFamily: 'Allison, cursive', fontSize: 'xx-large' }}
          >
            <img
              className='rounded img-fluid mb-2'
              src='img/logo.png'
              height='50'
              width='50'
              alt=''
            />
            <span className='ml-2'> Auctions </span>
          </Link>
          <button
            className='navbar-toggler'
            data-toggle='collapse'
            data-target='#navbarCollapse'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <ul className='navbar-nav ml-auto'>
              <li
                data-toggle='collapse'
                data-target='#navbarCollapse'
                className='nav-item'
              >
                <Link to='/' className='nav-link'>
                  All Listings
                </Link>
              </li>
              <li
                className='nav-item'
                data-toggle='collapse'
                data-target='#navbarCollapse'
              >
                <Link to='/activelistings' className='nav-link'>
                  Active Listings
                </Link>
              </li>
              <li
                className='nav-item'
                data-toggle='collapse'
                data-target='#navbarCollapse'
              >
                <Link to='/categories' className='nav-link'>
                  Categories
                </Link>
              </li>

              {!isAuthenticated ? guestLink : userLinks}
            </ul>
          </div>
        </div>
      </nav> */}
    </Fragment>
  );
};

FixedNavbar.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(FixedNavbar));
