import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import KeepTrack from "./components/KeepTrack";
import AccountSetup from "./components/AccountSetupForm";
import Login from "./components/Login";
import NairoFilmQuest from "./components/NairoFilmQuest";
import Films from "./components/films";
import FilmDetails from "./components/FilmDetails";
import UserProfile from "./components/UserProfile";
import SingleFilm from "./components/SingleFilm";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import {GlobalProvider} from "./context/GlobalState";
import PasswordReset from "./components/PasswordReset";
import PasswordResetConfirmation from "./components/PasswordResetConfirmation";
import MyAccountSetup from "./components/MyAccountSetup";

const AppRoutes = () => {
  return (
    <GlobalProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/keepTrack" element={<KeepTrack />} />
      <Route  path="/AccountSetup" element={<MyAccountSetup />}/>
      <Route path="/Login" element={<Login showRegistration={true} />} />
      <Route path="/NairoFilmQuest" element={<NairoFilmQuest/>} />
      <Route path="/all-films" element={<Films/>}/>
      <Route path="/film-Details" element={<FilmDetails/>}/>
      <Route path="/User-Profile/:id" element={<UserProfile />} />
      <Route path="film/:id" element={<SingleFilm/>} />
      {/* <Route path="/watchlist" element={<WatchList/>}/> */}
      <Route path='/watched' element={<Watched/>}/>
      <Route path="/forgot-password" Component={PasswordReset} exact />
      <Route path="/reset-password/:token" element={<PasswordResetConfirmation/>} />
      <Route path="/Watchlist/:userId" element={<Watchlist/>} />
    </Routes>
    </GlobalProvider>
  );
};

export default AppRoutes;
