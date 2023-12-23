import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import KeepTrack from "./components/KeepTrack";
import AccountSetup from "./components/AccountSetup";
import Login from "./components/Login";
import NairoFilmQuest from "./components/NairoFilmQuest";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/keepTrack" element={<KeepTrack />} />
      <Route  path="/AccountSetup" element={<AccountSetup />}/>
      <Route path="/Login" Component={Login}/>
      <Route path="/NairoFilmQuest" element={<NairoFilmQuest/>} />
    </Routes>
  );
};

export default AppRoutes;
