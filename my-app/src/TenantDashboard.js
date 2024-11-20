import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from "./PropertyCard";

const TenantDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const CITIES = ['New Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Bangalore'];
    const [userId, setUserId] = useState('');



    useEffect(() => {
        const userId = localStorage.getItem("userId")
        setUserId(userId)
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/properties/search', {
                    params: {
                    }
                });
                setProperties(response.data);
                setFilteredProperties(response.data);

            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const handleCityFilter = (e) => {
        console.log("inside city filter")
        const selectedCity = e.target.value;
        setSelectedCity(selectedCity);
        console.log(selectedCity);

        console.log(properties)
        console.log(properties.filter(property => property.address.city === selectedCity))
        setFilteredProperties(properties.filter(property => property.address.city === selectedCity));
    };

    return (
        <div>
            <h2>Welcome to the Tenant Dashboard</h2>

            <div>
                <label htmlFor="city-filter">Select City:</label>
                <select id="city-filter" value={selectedCity} onChange={handleCityFilter}>
                    {CITIES.map(city => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} hasApplied={property.tenantsApplied.includes(userId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TenantDashboard;
