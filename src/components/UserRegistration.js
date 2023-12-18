import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserRegistration.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

const UserRegistration = ({ showRegistrationModal, closeRegistrationModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/register', data);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        // save access_token in session storage
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('refresh_token', refreshToken);

        // redirect or perform any other action upon successful login
        window.location.href = '/AccountSetup'; // change the URL to your desired route
      } else {
        const errorResponse = response.data ? response.data : 'An unknown error occurred';
        console.error('Registration error:', errorResponse);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  };

  return (
    <>
      <div className="form-captain">
        {showRegistrationModal && (
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
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary">
                Register
              </button>

              {/* Login Link */}
              <p className="mt-3">
                Already have an account? <Link to="/Login">Login here</Link>.
              </p>
            </form>

            {/* Close Button */}
            <button type="button" className="btn btn-secondary" onClick={closeRegistrationModal}>
              <IoIosCloseCircleOutline />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserRegistration;
