import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaTransgenderAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";

const AccountSetup = () => {
    
    return (
        <>
            <div className="accountsetup">
                <div className="welcome-tag">
                    <h1>
                        WELCOME TO NAIRO FILM QUEST- NFQ
                    </h1>
                </div>
                <div className="setup-information">
                    <p>Personalize your profile to make it easy for friend to find you.
                        All fields are optional and we only use your birthday and profile.
                    </p>
                </div>

                <div className="avatar">
                        <img alt=""></img>
                </div>

                <div className="inputform-setup">
                    <form className="form">

              {/* DISPLAY NAME PART */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" title="your preferred name">
                    <CgProfile />
                </label>
                <input
                  type="text"
                />
              </div>

              {/* Location Input */}
              <div className="mb-3">
                <label htmlFor="location" className="form-label" title="location">
                    <FaLocationCrosshairs />
                </label>
                <input
                  type="email"
                />
              </div>

              {/* Gender Input */}
              <div className="mb-3">
                <label htmlFor="gender" className="form-label" title="your preferred gender">
                    <FaTransgenderAlt />
                </label>
                <input
                  type="password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Birthday" className="form-label" title="birthday">
                    <FaBirthdayCake />
                </label>
                <input
                  type="text"
                />
              </div>
              {/* Register Button */}
              <button type="submit" className="btn btn-primary">
                NEXT STEP
              </button>
            </form>
                </div>
            </div>
        </>
    )
}

export default AccountSetup;