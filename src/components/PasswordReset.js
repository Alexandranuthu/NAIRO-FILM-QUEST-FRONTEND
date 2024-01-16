import React from "react";
import { useState } from "react";
import axios from "axios";
import "./UserRegistration.css";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4000/forgot-password', {email});
            setMessage(response.data.message);
        }catch(error) {
            setMessage('An error occured. Please try again');
        }
    };

    return(
        <>
            <div className="form-captain">
                <div className="registration-container">
                    <h2>Password Reset</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Email:</label>
                                        <input 
                                        type="email"
                                        value={email} 
                                        onChange={(e)=> setEmail(e.target.value)} 
                                        required 
                                        className="form-control"
                                        />
                                        </div>
                                        
                                        <button type="submit" className="btn">Reset Password</button>
                                    </form>
                                    {message && <p className="message">{message}</p>}
                </div>
                
            </div>
        </>
    )
}

export default PasswordReset;