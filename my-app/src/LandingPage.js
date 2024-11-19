import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

const LandingPage = () => {

    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to My App</h1>
            <div>
                <button onClick={handleSignupClick}>Sign Up</button>
                <br/>
                <button onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    );
};

export default LandingPage;