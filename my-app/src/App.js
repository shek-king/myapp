import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingPage from "./LandingPage";
import TenantDashboard from "./TenantDashboard";
import LandloardDashboard from "./LandloardDashboard";
import AddProperty from "./AddProperty";
import PropertyDetail from "./PropertyDetail";
import EditProperty from "./EditProperty";

const App = () => {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tenantDashboard" element={<TenantDashboard />} />
              <Route path="/landloardDashboard" element={<LandloardDashboard />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/property-detail/:id" element={<PropertyDetail />} />
              <Route path="/properties/edit/:id" element={<EditProperty />} />
          </Routes>
      </Router>
  );
};

export default App;