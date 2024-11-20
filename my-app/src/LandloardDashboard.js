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
        const landlord = localStorage.getItem("userId")
        setUsername(username)

        // Fetch properties from an API or any other data source
        const fetchProperties = async () => {
            const payload = {
                landlord : landlord
            }
            try {
                const response =
                    await axios.post('http://localhost:8000/api/properties/getLandlordProperties', payload);
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
            <Navbar />
            <h2>Welcome {username} the Landloard Dashboard </h2>
            {properties.length>0 && (<div>
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>)}

            {properties.length<=0 && (<div>
                <h2>You don't have any properties listed yet.
                    Please begin by adding some properties. <br />
                Click the <b style={{color: "green"}}>Add property</b> button above</h2>
            </div>)}

        </div>
    );
};

export default LandloardDashboard;