import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./UserRegistration.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

const UserRegistration = ({showRegistration, closeModal}) => {
  const {register, formState: {errors}} = useForm();
  const [newUser, setNewUser] = useState ({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState(null);
  if(!showRegistration) return null

  
  const onSubmit = (data) => {
    //handle form submission
    console.log(data);
  }
  

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try{
        const response = await axios.post('http://localhost:4000/register',
         {username:newUser.username,
          email:newUser.email,
          password: newUser.password
        });
  
        if (response.status === 200) {
          const {accesstoken, refreshtoken} = response.data;
  
          //save access_token in session storage
          sessionStorage.setItem('access_token', accesstoken);
          sessionStorage.setItem('refresh_token', refreshtoken);
  
          //redirect or perform any other action upon successful login
          window.location.href = '/'; //change the URL to your desired route
        }else {
          //const message-response.data.error.message
          const errorResponse = response.data ? response.data : 'An unknown error occurred';
  
          setError(errorResponse);
        }
      }catch (error){
        console.error('An error occurred during login:', error);
        setError('An error occurred. Login the user Please try again');
      }
    }
  return (
    <>
    <div className="form-captain">
      {showRegistration && (
        <div className="registration-container">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                value={newUser.username}
                {...register('username', { required: 'Username is required'})}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value})}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username.message}</div>
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
                  pattern:{
                    value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  }
                })}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value})}
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
                id="password"
                placeholder="Enter your password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value})}
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>

            <p className="mt-3">
              Already have an account? <Link to="/Login">Login here</Link>.
            </p>
          </form>
          <button type="button" className="btn btn-secondary" onClick={closeModal}><IoIosCloseCircleOutline /></button>
        </div>
      )}
      </div>
    </>
  );
};

export default UserRegistration;
