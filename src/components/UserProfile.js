import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";


const UserProfile = ({userId}) => {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/getUser/${userId}`);
                console.log('api response:', response)
                setUser(response.data);
            }catch(error) {
                console.error('error fetching user profile',error);
            }
        };
        fetchUserProfile();
    }, [userId]);

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