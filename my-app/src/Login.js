import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from "./Dashboard";

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
            const response = await axios.post('/api/login', formData);

            // Handle the response from the server
            console.log(response.data);
            setSignupSuccess(true); // Set signupSuccess to true after successful sign-up


            // You can optionally store the user's authentication token in localStorage or cookies
            // and redirect the user to the dashboard or home page
        } catch (error) {
            // Handle any errors that occurred during login
            console.error('Login error:', error);
            // You can show an error message to the user
        }
    };

    return (
        <div>
            {signupSuccess ? (
                <Dashboard />
            ) : (<>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form> </>)}
        </div>
    );
};

export default Login;