import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UserRegistration.css";

const PasswordResetConfirmation = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid reset link');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/reset-password/${token}`, {
        password: password,
        confirmPassword: confirmPassword,
      });

      setMessage(response.data.message);
      window.location.href = "/Login";
    } catch (error) {
      setMessage('An error occurred. Please try again');
    }
  }

  return (
    <>
      <div className="form-captain">
        <h2 className="mb-4" style={{color: 'white'}}>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control"
            required
          />
          </div>
          <label htmlFor="password" className="form-label">Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="form-control"
            required
          /><br/>
          <button type="submit" className="btn">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
}

export default PasswordResetConfirmation;
