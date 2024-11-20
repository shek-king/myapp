import React, {useEffect, useState} from 'react';
import './PropertyCard.css';
import {Link} from "react-router-dom";
import axios from "axios";

const BookingApplicationCard = ({ booking }) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        setUserId(userId)
    }, []);

    const { propertyId, title, address, numberOfRooms, size, bookingStatus } = booking;
    console.log("title "+ title)
    console.log("numberOfRooms "+ numberOfRooms)
    console.log("bookingStatus "+ bookingStatus)
    console.log(booking)
    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACNVbmQg3xxv0QKmUNsuBdFF95uoCBl6Ldg&s";

    return (
        <Link to={`/property-detail/${propertyId}`} target="_blank" rel="noopener noreferrer" className="property-card-link">
            <div className="property-card">
                <div className="property-image-container">
                    <img src={imageUrl} alt={title} className="property-image"/>
                </div>
                <div className="property-details">
                    <h2 className="property-title">{title}</h2>
                    <div className="property-info">
                        <p className="property-address">
                            {address.street}, {address.city}, {address.state}, {address.country}, {address.postalCode}
                        </p>
                        <p className="property-units">Number of Rooms: {numberOfRooms}</p>
                        <p className="property-size">Size: {size} sq ft</p>
                    </div>
                </div>
                <div className="property-price-booking">
                    <button disabled className="applied-button">
                        {bookingStatus}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default BookingApplicationCard;