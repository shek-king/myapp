import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import TenantDashboard from "./TenantDashboard";
import LandloardDashboard from "./LandloardDashboard";

const App = () => {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tenantDashboard" element={<TenantDashboard />} />
              <Route path="/landloardDashboard" element={<LandloardDashboard />} />
          </Routes>
      </Router>
  );
};

export default App;