import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated === true) {
    return <Redirect to='/' />;
  }
  return (
    <div className='container mb-5'>
      <div className='row'>
        <div className='col-lg-4 m-auto text-center'>
          <h3>Sign Up Today</h3>
          <p>Please fill out this form to register</p>
          <hr />
          <form action='' onSubmit={e => onSubmit(e)} className=''>
            <input
              placeholder='Username'
              className='form-control my-3'
              type='text'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
            <input
              placeholder='Email'
              className='form-control my-3'
              type='email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <input
              placeholder='Password'
              className='form-control my-3'
              type='password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              required
            />
            <input
              placeholder='Confirm Password'
              className='form-control my-3'
              type='password'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
              required
            />
            <button className='btn btn-primary btn-block'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
