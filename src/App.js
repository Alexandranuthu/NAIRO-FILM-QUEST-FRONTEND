import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './appRoutes';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <div
          className="background-image-container"
          style={{
            // backgroundImage: "url(/images/auntieboss.jpg)",
            backgroundColor: "grey",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="content-container">
            <AppRoutes />
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
            <button>JOIN NFQ - IT'S FREE!</button>
          </div>
        </div>
        <HomePage />
      </div>
    </Router>
  );
}

export default App;
