import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";


const UserProfile = () => {
    const [user, setUser] = useState("");

    useEffect(() =>{
        const fetchUserProfile = async () => {
            try {
                const userId = '65636babfa0ab18dd52cd238'
                const response = axios.get(`http://localhost:4000/getUser/${userId}`)
                setUser(response.data);
            }catch(error) {
                console.error(error);
            }
        };
        fetchUserProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>
    }

    return(
        <>
            <div className="Profile-container">
                <h1>Welcome to your, User Profile</h1>
                <div className="main-profile">
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
        </>
    )

}

export default UserProfile;