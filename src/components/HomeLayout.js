// App.js
import React from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import UserRegistration from '../components/UserRegistration';
import Login from '../components/Login';
import { useState } from 'react';
import Modal from 'react-modal';

function App() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openRegistrationModal = () => setShowRegistrationModal(true);
  const closeRegistrationModal = () => setShowRegistrationModal(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
        <div
          className="background-image-container"
          style={{
            backgroundColor: "grey",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url('images/i am samuel.webp')`
          }}
        >
          <div className="content-container">
            <Navbar />
          </div>
          {/* TAGLINE FOR NFQ */}
          <div className='tagline'>
            <h1>Lights.</h1>
            <h1>Camera.</h1>
            <h1>Explore.</h1>
            <h1>Your Kenyan Film Experience Awaits.</h1>
          </div>
          <div className='getstarted'>
            <button onClick={openRegistrationModal}>JOIN NFQ - IT'S FREE</button>
            <button onClick={openLoginModal}>LOGIN TO YOUR ACCOUNT</button>
            {/*Registration modal*/}
            <Modal isOpen={showRegistrationModal} onRequestClose={closeRegistrationModal}>
              <UserRegistration showRegistrationModal={showRegistrationModal} closeRegistrationModal={closeRegistrationModal} />
            </Modal>
            {/*Login Modal*/}
            <Modal isOpen={showLoginModal} onRequestClose={closeLoginModal}>
              <Login showRegistration={showLoginModal} closeModal={closeLoginModal} />
            </Modal> 
          </div>
        </div>
  );
}

export default App;
