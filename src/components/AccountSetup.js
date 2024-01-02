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

const AccountSetup = () => {
  const [file, setFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalenderOpen(false);
  }
  
  const toggleCalendar = () =>{
    setIsCalenderOpen(!isCalenderOpen);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', email);
  
    try {
      // Log the formData to ensure the file is being appended correctly
      console.log("FormData:", formData);
  
      // Log the constructed API URL
      const apiUrl = `http://localhost:4000/register/addUserStep2/${email}`;
      console.log("API URL:", apiUrl);
  
      // Use email state to construct the API URL
      const response = await axios.post(apiUrl, formData);
  
      // Log the response for debugging
      console.log("Server Response:", response);
  
      if (response.status === 200) {
        console.log('File Uploaded Successfully');
        // Redirect to your desired route after successful upload
        window.location.href = "/NairoFilmQuest";
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
          <div className="mb-3">
              <label htmlFor="email" className="form-label-setup" title="email">
              <MdMarkEmailRead size={30}/>
              </label>
              <input type="email" placeholder="email" onChange={handleEmailChange} />
            </div>
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

            <div className="mb-3">
              <label htmlFor="bio" className="form-label-setup" title="Bio">
              <FaBrain  size={30}/>
              </label>
              <input type="text" placeholder="enter your Bio">
              </input>
            </div>

            <div className="mb-3 birthday-container">
              <label htmlFor="birthday" className="form-label-setup">
                <FaBirthdayCake size={30}/>
              </label>
            <div className="birthday-select">
                <button type="button" onClick={toggleCalendar}>
                    Pick a Date
                </button>
                {isCalenderOpen && (
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              calendarType="US"
              className="react-calendar"
            />
          )}
          <input
            type="text"
            placeholder="Selected Date"
            value={selectedDate.toLocaleDateString()}
            readOnly
          />
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
