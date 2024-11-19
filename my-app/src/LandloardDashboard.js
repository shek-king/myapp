import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import PropertyCard from "./PropertyCard";


const LandloardDashboard = () => {

    // get properties for landlord

    const [properties, setProperties] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const username = localStorage.getItem("username")
        setUsername(username)

        // Fetch properties from an API or any other data source
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/properties/all');
                console.log(response.data)

                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h2>Welcome {username} the Landloard Dashboard </h2>
            <div>
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>
    );
};

export default LandloardDashboard;