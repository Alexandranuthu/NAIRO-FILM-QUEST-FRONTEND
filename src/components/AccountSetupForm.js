import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaTransgenderAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBrain } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

const AccountSetupForm = ({ onSubmit, userData }) => {
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState(""); 
  const [location, setLocation] = useState("");



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBioChange = (e) => { 
    setBio(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("bio", bio);
    formData.append("location", location);

    onSubmit(formData);
  };

  // const handleUpload = async (e) => {
  //   e.preventDefault();

  //   const missingFields = [];

  //   // Validation checks for required fields
  //   if (!email) {
  //     missingFields.push('Email');
  //   }
  //   if (!location) {
  //     missingFields.push('Location');
  //   }

  //   // Check if there are missing fields
  //   if (missingFields.length > 0) {
  //     console.error('Missing required fields:', missingFields);
  //     // Display an error message or take appropriate action
  //     return;
  //   }

  //   // Validation checks
  //   if (!email || !location ) {
  //     console.error('Missing required fields');
  //     // You can display an error message to the user or prevent form submission.
  //     return;
  //   }

  //   // Call the main submit handler
  //   handleSubmit(e);
  // }
  
  

  return (
    <>
      <div className="accountsetup"
        style={{
          backgroundColor: "grey",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "130vh",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `url('images/youagain.webp')`,
          // Add the following line to improve image rendering
          imageRendering: "1080p", // or "pixelated" or "crisp-edges"
        }}
      >
        <div className="welcome-tag">
          <h1>WELCOME TO NAIRO FILM QUEST- NFQ</h1>
        </div>
        <div className="setup-information">
          <p>
            Personalize your profile to make it easy for friends to find you. All fields are optional,
            and we only use your birthday and profile.
          </p>
        </div>
        <form className="form setup" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="avatar">
          <label htmlFor="file-input">
            <div className="avatar-container">
              <img src={file ? URL.createObjectURL(file) : "/default-avatar.png"} alt="Avatar" />
              <div className="overlay">
                {/* <CgProfile size={30} color="#fff" /> */}
                <input type="file" id="file-input" onChange={handleFileChange}  name="profilePicture"/>
              </div>
            </div>
          </label>
        </div>

        <div className="inputform-setup">
          

            {/* Location Input */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label-setup" title="location">
                <FaLocationCrosshairs size={30} />
              </label>
              <input type="location" placeholder="location" onChange={handleLocationChange} name="location" />
            </div>

          

            <div className="mb-3">
              <label htmlFor="Bio" className="form-label-setup" title="Bio">
              <FaBrain  size={30}/>
              </label>
              <input type="text" placeholder="enter your Bio" onChange={handleBioChange} name="bio">
              </input>
            </div>

            {/* Register Button */}
            <button type="submit" className="btn" style={{ backgroundColor: "#FFD700" }}>
              NEXT STEP
            </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default AccountSetupForm;
