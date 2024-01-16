import React, { useState } from "react";
import NavbarOfficial from "./navbarOfficial";
import "./UserProfile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const UserProfile = () => {
  const [activeNavItem, setActiveNavItem] = useState("profile");
  const userId = sessionStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [filmList, setFilmList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = sessionStorage.getItem('userId');
  
        if (!storedUserId) {
          // Handle the case where userId is not available
          console.error('User ID not found in sessionStorage');
          return;
        }
  
        const accessToken = sessionStorage.getItem('access_token');
  
        const url = `http://localhost:4000/api/profile/${storedUserId}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          // Handle non-successful responses
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
  
        const json = await response.json();
        setUser(json.data);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
  
    fetchProfile();
  }, []);
  
  useEffect(() => {
    // Fetch films based on the search term
    const fetchFilms = async (searchKey) => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
  
        const url = `http://localhost:4000/getFilms${searchKey ? `?search=${searchKey}` : ''}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          // Handle non-successful responses
          throw new Error(`Failed to fetch films: ${response.status}`);
        }
  
        const json = await response.json();
        setFilmList(json.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };
  
    fetchFilms();
  }, []);
  

  const handleSaveChanges = async () => {
    try {
      const accessToken = sessionStorage.getItem('access_token');
      const url = `http://localhost:4000/api/update/${userId}`;
      
      const response = await axios.put(
        url,
        {
          username: user.username,
          email: user.email,
          location: user.location,
          bio: user.Bio,
          pronouns: user.pronouns,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('User updated successfully', response.data);

      if (profileImage) {
        const imageData = new FormData();
        imageData.append("image", profileImage);
    
        const accessToken = sessionStorage.getItem('access_token');
    
        await axios.post("http://localhost:4000/single", imageData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    
        console.log('Profile picture uploaded successfully');
    }
      

      // Handle the successful update, e.g., show a success message
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  }

  

  const renderContent = () => {
    if (activeNavItem === "profile") {
      return (
        <>
          <h1>Welcome to your profile!</h1>
          {/* USERNAME INPUT */}
          <div className="Username">
            <label>Username</label>
            <input className="username input" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
          </div>
          {/* EMAIL INPUT*/}
          <div className="Email">
            <label>Email Address:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              className="email input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            /><br />
          </div>
          {/* LOCATION */}
          <div className="Location">
            <label>City, State & Zip Code:</label><br />
            <input
              type="location"
              id="location"
              name="location"
              value={user.location}
              className="location input"
            />
          </div>
          {/* BIO */}
          <div className="Bio">
            <label>About You:</label><br />
            <textarea  value={user.bio}/>
          </div>
          {/* PRONOUNS */}
          <div className="Pronouns">
            What are your preferred pronouns? (optional)<br />
            <select name="pronouns" id="pronouns" className="pronouns">
              <option value="they/their">they/their</option>
              <option value="she/her">she/her</option>
              <option value="he/his">he/his</option>
              <option value="she/their">she/their</option>
              <option value="he/their">he/their</option>
            </select>
          </div>

          <button className="button btn" onClick={handleSaveChanges}>
          SAVE CHANGES
        </button>
        </>

        
      );
    } else if (activeNavItem === "avatar") {
      return (
        <>
          <h1>Edit Your Profile Picture</h1>
          <div className="avatar">
  <div className="avatar-container">
    <img
      src={
        profileImage
          ? URL.createObjectURL(profileImage)
          : user.profilePicture
          ? `http://localhost:4000/avatars/${user.profilePicture}`
          : `http://localhost:3000/profile/avatar.png` // Provide the path to your default image
      }
      alt="Profile"
      className="profile-picture"
    />
  </div>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e)}
  />
</div>
<button className="button btn" onClick={handleSaveChanges}>
  SAVE CHANGES
</button>

        </>
      );
    }
  };

  return (
    <>
      <div className="navbar-actual">
        <NavbarOfficial />
      </div>
      <div className="Profile-container">
        <div className="main-profile">
          <div className="navbar">
            <div
              className={`nav-item ${activeNavItem === "profile" ? "active" : ""}`}
              onClick={() => handleNavItemClick("profile")}
            >
              Profile
            </div>
            <div
              className={`nav-item ${activeNavItem === "avatar" ? "active" : ""}`}
              onClick={() => handleNavItemClick("avatar")}
            >
              Avatar
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
