import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from "./Dashboard";
import './Login.css'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [signupSuccess, setSignupSuccess] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your server's login endpoint
            const response = await axios.post('http://localhost:8000/api/user/login', formData);

            // Handle the response from the server
            console.log(response.data);
            setSignupSuccess(true); // Set signupSuccess to true after successful sign-up
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userType', response.data.userType);
            localStorage.setItem('userId', response.data.userId);

            // You can optionally store the user's authentication token in localStorage or cookies
            // and redirect the user to the dashboard or home page
        } catch (error) {
            // Handle any errors that occurred during login
            console.error('Login error:', error);
            // You can show an error message to the user
        }
    };

    return (
        <div className="login-container">
            {signupSuccess ? (
                <Dashboard/>
            ) : (
                <div className="login-form-container">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;