import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return(
        <>
            <div className="footer">

            <div className="about-section">
                <Link 
                    to="/About"
                    style={{ 
                        textDecoration:'none',
                        fontSize: 'large',
                        color:"white",
                        }}
                >
                    <h4>About</h4>
                </Link>
            </div>

            <div className="API-section">
                <Link 
                    to="/API"
                    style={{ textDecoration:'none',
                            fontSize: 'large',
                            color:"white",
                }}


                    
                >
                    <h4>APIs Used</h4>
                </Link>
            </div>

            <div className="icons-section">
                <div className="twitter">
                   <FaXTwitter  size={25} title="X for NFQ"/> 
                </div>

                <div className="instagram">
                    <IoLogoInstagram size={25} title="instagram for NFQ" />
                </div>

                <div className="tiktok">
                    <FaTiktok size={25} title="tiktok for NFQ"/>
                </div>

                <div className="youtube">
                    <FaYoutube size={25} title="youtube for NFQ" />
                </div>
            </div>

            <div className="footer-paragraph">
                &copy; 2023 Nairo Film Quest.
                Made by Alexandra Nuthu in Nairobi, Kenya.
            </div>
        </div>
        </>
    )
}
export default Footer;