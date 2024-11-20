// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/landloardDashboard">View Property</Link>
            <Link to="/add-property">Add Property</Link>

        </nav>
    );
}

export default Navbar;
