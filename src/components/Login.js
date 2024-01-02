import { useForm } from "react-hook-form";
import axios from 'axios';
import React, { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";




const Login = ({ showRegistration, closeLoginModal}) =>{
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username: data.username,
        email: data.email,
        password: data.password
      });
      

      
  
      if (response.status === 200) {
        const { user,userId,accessToken, refreshToken } = response.data;
       
        console.log('response from server', response.data);
        // Check if tokens are present
        if (accessToken && refreshToken) {
          // Save tokens in session storage
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);

          sessionStorage.setItem('userId', user.userId);
          setUser(user);
          setIsLoggedIn(true);

          console.log('user has logged in successfully', user);
          // window.location.href= ('/NairoFilmQuest');

        } else {
          // If tokens are not present, treat it as an error
          console.log('Login failed:', 'Tokens not present');
          setError('username', { type: 'manual', message: 'Incorrect email/password combination' });
          setError('password', { type: 'manual', message: 'Incorrect email/password combination' });
        }
      } else {
        // If the status is not 200, treat it as an error
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
    }
  };

  useEffect(() => {
    console.log('useEffect triggered. isLoggedIn:', isLoggedIn, 'user:', user);

    if (isLoggedIn && user) {
      console.log('Setting userId in sessionStorage. User ID:', user._id);
      // Check if user is available before setting userId
      sessionStorage.setItem('userId', user._id);
      
      setTimeout(() => {
        console.log('logged in user:', user.username);
        console.log('User ID stored in session storage:', user._id);
  
        window.location.href = '/NairoFilmQuest';
      });
    }
  }, [isLoggedIn, user]);
  
  return (
    <>
    <div className="form-captain" >
        {showRegistration && (
          <div className="registration-container">
            {isLoggedIn ? (
              <div>
                <h2>Welcome, {user.username}!</h2>
              </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ backgroundColor: '#EA0085' }}>
              <h2 className="mb-4">JOIN NFQ</h2>

              {/* Username Input */}
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

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Register Button */}
              <button type="submit" className="btn">
                LOGIN
              </button>
            </form>
            )}
            {/* Close Button */}
            <button type="button" className="btn btn-secondary" onClick={() => closeLoginModal(setUser)}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
        )}
      </div>
      </>
  )
}
export default Login;