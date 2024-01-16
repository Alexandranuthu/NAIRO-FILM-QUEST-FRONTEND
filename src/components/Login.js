import { useForm } from "react-hook-form";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";

const Login = ({ showRegistration, closeLoginModal }) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const login = (id) => {
    setIsLoggedIn(true);
    setUserProfile(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const onSubmit = async (data) => {
    try {
      const accessToken = sessionStorage.getItem('access_token');

      const response = await axios.post('http://localhost:4000/login', {
        username: data.username,
        email: data.email,
        password: data.password
      }, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        const { user, accessToken, refreshToken, message } = response.data;
        console.log('response from server', response.data);

        if (accessToken && refreshToken) {
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);
          sessionStorage.setItem('userId', user.userId);
          setUser(user);
          login(user.userId); // Call the login function directly
          window.location.href = '/NairoFilmQuest';
        } else {
          console.log('Login failed:', 'Tokens not present');
          setError('username', { type: 'manual', message: 'Incorrect email/password combination' });
          setError('password', { type: 'manual', message: 'Incorrect email/password combination' });
        }
      } else {
        const errorResponse = response.data ? response.data : 'An unknown error occurred';
        console.log('Login failed:', errorResponse);
        setError('username', { type: 'manual', message: 'Incorrect email/password combination' });
        setError('password', { type: 'manual', message: 'Incorrect email/password combination' });
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      console.log(error);
      setError('username', { type: 'manual', message: 'An error occurred. Please try again' });
      setError('password', { type: 'manual', message: 'An error occurred. Please try again' });

      if (error.message === 'Network Error') {
        setError('username', { type: 'manual', message: 'Failed to connect to the server. Please check your network connection.' });
        setError('password', { type: 'manual', message: 'Failed to connect to the server. Please check your network connection.' });
      } else {
        setError('username', { type: 'manual', message: 'An error occurred. Please try again' });
        setError('password', { type: 'manual', message: 'An error occurred. Please try again' });
      }
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
      login(sessionStorage.getItem('userId'));
    }
  }, []);

  return (
    <>
      <div className="form-captain">
        {showRegistration && (
          <div className="registration-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ backgroundColor: '#EA0085' }}>
              <h2 className="mb-4">JOIN NFQ</h2>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  placeholder="Enter your username"
                  {...register('username', { required: 'Username is required' })}
                />
                {errors.username && (
                  <div className="invalid-feedback" style={{ color: 'green' }}>{errors.username.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register("password", {
                    required: "Required",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                      message: "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback" style={{ color: 'green' }}>{errors.password.message}</div>
                )}
              </div>

              <button type="submit" className="btn">
                LOGIN
              </button>

              <Link to={'/forgot-password'}>
                  Forgot Password?
              </Link>
            </form>
            <button type="button" className="btn btn-secondary" onClick={() => closeLoginModal()}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
