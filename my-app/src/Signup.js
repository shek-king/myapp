import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from "./Dashboard";
import './Signup.css'


const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        userType: 'tenant',
    });

    const [signupSuccess, setSignupSuccess] = useState(false);


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'radio' ? value : e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your server's sign-up endpoint
            const response = await axios.post('http://localhost:8000/api/user/signup', formData);

            // Handle the response from the server
            console.log(response.data);
            setSignupSuccess(true);
            // Set signupSuccess to true after successful sign-up
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userType', response.data.userType);
            localStorage.setItem('userId', response.data.userId);


            // You can optionally redirect the user or show a success message
        } catch (error) {
            // Handle any errors that occurred during sign-up
            console.error('Sign-up error:', error);
            // You can show an error message to the user
        }
    };

    return (

        <div className="signup-container">
            {signupSuccess ? (
                <Dashboard/>
            ) : (
                <div className="signup-form-container">
                    <h2 className="signup-title">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <label>User Type:</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="landlord"
                                        checked={formData.userType === 'landlord'}
                                        onChange={handleChange}
                                    />
                                    Landlord
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="tenant"
                                        checked={formData.userType === 'tenant'}
                                        onChange={handleChange}
                                    />
                                    Tenant
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Signup;