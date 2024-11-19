import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();


    useEffect(() => {
        const keys = Object.keys(localStorage);

        // Loop through keys and log each one
        keys.forEach(key => {
            console.log(`Key: ${key}, Value: ${localStorage.getItem(key)}`);
        });
        const userType = localStorage.getItem("userType")
        if(userType === "tenant") {
            navigate('/tenantDashboard');
        } else {
            navigate('/landloardDashboard');
        }
    }, []);


    return (
        <div>
            Main Dashboard page
        </div>
    );
};

export default Dashboard;