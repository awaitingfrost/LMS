import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Signin.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';
import Switch from '@material-ui/core/Switch';

function Signin() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const API_URL = 'http://localhost:5000/';

  const loginCall = async (postData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(`${API_URL}api/auth/signin`, postData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      if (res.data.isAdmin) {
        history.push('/dashboard@admin');
      } else {
        history.push('/dashboard@member')
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err });
      setError('Wrong Password Or Username');
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    const postData = {
      username: loginId,
      password: password,
    };
    loginCall(postData);
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    // You'll need to use the Google Sign-In API and handle the authentication flow
    // Check the Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/sign-in
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title"> Log in</h2>
          <p className="line"></p>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <label htmlFor={'loginId'}>
              <b>{'Login Id'}</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder={'Enter Login Id'}
              name={'loginId'}
              required
              onChange={(e) => {
                setLoginId(e.target.value);
              }}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="signin-button">
            Log In
          </button>
        </form>
        <div className="signup-option">
          <p className="signup-question">Don't have an account? Contact Librarian</p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
