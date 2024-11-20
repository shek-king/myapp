// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const TenantNavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/tenantProfile">Manage Profile</Link>
            <Link to="/tenantDashboard">View Properties</Link>
            <Link to="/view-applications">View Applications</Link>
        </nav>
    );
}

export default TenantNavBar;

