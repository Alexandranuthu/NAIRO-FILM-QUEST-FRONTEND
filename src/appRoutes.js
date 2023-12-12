import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
