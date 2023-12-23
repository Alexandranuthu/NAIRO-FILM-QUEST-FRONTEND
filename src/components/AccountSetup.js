import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaTransgenderAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';

const AccountSetup = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:4000/single', formData);

      if (response.status === 200) {
        console.log('File Uploaded Successfully');
      } else {
        console.error('Failed to upload File');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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

        <div className="avatar">
          <label htmlFor="file-input">
            <div className="avatar-container">
              <img src={file ? URL.createObjectURL(file) : "/default-avatar.png"} alt="Avatar" />
              <div className="overlay">
                {/* <CgProfile size={30} color="#fff" /> */}
                <input type="file" id="file-input" onChange={handleFileChange} />
              </div>
            </div>
          </label>
        </div>

        <div className="inputform-setup">
          <form className="form setup">
            {/* DISPLAY NAME PART */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label-setup" title="your preferred name">
                <CgProfile size={30}/>
              </label>
              <input type="text" placeholder="Display name" />
            </div>

            {/* Location Input */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label-setup" title="location">
                <FaLocationCrosshairs size={30} />
              </label>
              <input type="location" placeholder="location" />
            </div>

            {/* Gender Input */}
            <div className="mb-3">
              <label htmlFor="gender" className="form-label-setup" title="your preferred gender">
                <FaTransgenderAlt size={30}/>
              </label>
              <select name="gender" id="gender" style={{ backgroundColor: "transparent", border: "none" }}>
                  <option value="non-binary">non-binary</option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                  <option value="prefer">Prefer not to say</option>
              </select>
            </div>

            <div className="mb-3 birthday-container">
              <label htmlFor="birthday" className="form-label-setup">
                <FaBirthdayCake size={30}/>
              </label>
            <div className="birthday-select">
                <select name="month" id="month" style={{ backgroundColor: "transparent", border: "none" }}>
                  <option value="" disabled selected>
                  Month
            </option>

    </select>
    <select name="day" id="day" style={{ backgroundColor: "transparent", border: "none" }}>
      <option value="" disabled selected>
        Day
      </option>
      <option></option>
      <option></option>
      <option></option>
      <option></option>
    </select>
    <select name="year" id="year" style={{ backgroundColor: "transparent", border: "none" }}>
      <option value="" disabled selected>
        Year
      </option>
      <option></option>
      <option></option>
      <option></option>
      <option></option>
    </select>
  </div>
</div>

            {/* Register Button */}
            <button type="submit" onClick={handleUpload} className="btn" style={{ backgroundColor: "#FFD700" }}>
              NEXT STEP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountSetup;
