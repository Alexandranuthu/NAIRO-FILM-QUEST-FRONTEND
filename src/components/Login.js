import { useForm } from "react-hook-form";
import axios from 'axios';
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";


const Login = ({ showRegistration, closeModal }) =>{
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/register/login', {
        email: data.email,
        password: data.password,
      });
  
      console.log('Login Response:', response);
  
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
  
        // Check if tokens are present
        if (accessToken && refreshToken) {
          // Save tokens in session storage
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);
  
          // Redirect to the dashboard

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
      setError('username', { type: 'manual', message: 'An error occurred. Please try again' });
      setError('password', { type: 'manual', message: 'An error occurred. Please try again' });
    }
  };


  return (
    <>
    <div className="form-captain">
        {showRegistration && (
          <div className="registration-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                  <div className="invalid-feedback">{errors.username.message}</div>
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
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>
            </form>

            {/* Close Button */}
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
        )}
      </div>
      </>
  )
}
export default Login;