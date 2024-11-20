import React, {useEffect, useState} from 'react';
import './PropertyCard.css';
import {Link} from "react-router-dom";
import axios from "axios";

const PropertyCard = ({ property , hasApplied}) => {
    const [userType, setUserType] = useState('landlord');
    const [userId, setUserId] = useState('');
    const [hasUserApplied, setHasUserApplied] = useState(hasApplied)

    useEffect(() => {
        const userType = localStorage.getItem("userType")
        const userId = localStorage.getItem("userId")
        setUserType(userType)
        setUserId(userId)

    }, []);


    const handleApplyNow = async(e, propertyId) => {
        e.preventDefault(); // Prevent the link from being followed
        console.log(e)
        console.log(`applying for property ${propertyId}`);

        try {
            const payload = {
                propertyId: propertyId,
                tenantId: userId
            }
            const response = await axios.post(`http://localhost:8000/api/properties/applyProperty`, payload);
            console.log(response.data.message);
            window.alert("Applied for property successfully")
            setHasUserApplied(true)
        } catch (error) {
            console.error('Error applying for property:', error);
            window.alert("Error while applying for property")
        }
    };

    const { _id, name, address, numberOfRooms, price, description, size, title } = property;
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACNVbmQg3xxv0QKmUNsuBdFF95uoCBl6Ldg&s";

    return (
        <Link to={`/property-detail/${_id}`} target="_blank" rel="noopener noreferrer" className="property-card-link">
            <div className="property-card">
                <div className="property-image-container">
                    <img src={imageUrl} alt={name} className="property-image"/>
                </div>
                <div className="property-details">
                    <h2 className="property-title">{title}</h2>
                    <div className="property-info">
                        <p className="property-address">
                            {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode}
                        </p>
                        <p className="property-units">Number of Rooms: {numberOfRooms}</p>
                        <p className="property-size">Size: {size} sq ft</p>
                        <p className="property-size">{property.tenantsApplied.length} person have applied for this</p>
                    </div>
                </div>
                <div className="property-price-booking">
                    {price && <p className="property-price">${price.toLocaleString()}</p>}
                    {userType === 'tenant' && (
                        hasUserApplied ? (
                            <button disabled className="applied-button">
                                Applied
                            </button>
                        ) : (
                            <button onClick={(e) => handleApplyNow(e, _id)} className="book-now-button">
                                Apply Now
                            </button>
                        )
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;