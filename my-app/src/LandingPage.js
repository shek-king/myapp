import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import './LandingPage.css';

const LandingPage = () => {

    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            <h1 className="landing-title">Welcome to My App</h1>
            <div className="button-container">
                <button className="btn btn-primary" onClick={handleSignupClick}>Sign Up</button>
                <button className="btn btn-secondary" onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    );
};

export default LandingPage;