import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
export const Login = ({ isAuthenticated, login }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };
  if (isAuthenticated === true) {
    return <Redirect to='/' />;
  }
  return (
    <section class=''>
      <div class='container mb-5 '>
        <div class='row'>
          <div class='col-lg-4 m-auto card py-5 text-center'>
            <h1 style={{ fontFamily: 'Allison, cursive' }}>AUCTIONS</h1>
            <hr />
            <form action='' class='mb-5' onSubmit={e => onSubmit(e)}>
              <input
                placeholder='Email'
                class='form-control my-3'
                type='text'
                name='email'
                onChange={e => onChange(e)}
                required
              />
              <input
                placeholder='Password'
                class='form-control my-3'
                type='password'
                name='password'
                onChange={e => onChange(e)}
                required
              />
              <button class='btn btn-primary btn-block'>Login</button>
            </form>
            <div class='mb-2'>
              <small>
                You Don't Have An Account?{' '}
                <Link to='/register'>Register now</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
