import React from 'react';
import './PropertyCard.css';


const PropertyCard = ({ property }) => {
    console.log(property)
    const { name, address, numberOfRooms, price, image, description, size, title } = property;

    return (
        <div className="property-card">
            {image && <img src={image} alt={name} className="property-image"/>}
            <div className="property-info">
                <b><p className="property-units">{title}</p></b>
                <p className="property-address">Address: {address}</p>
                <p className="property-units">Number of Rooms: {numberOfRooms}</p>
                <p className="property-units">Description: {description}</p>
                <p className="property-units">Size: {size}</p>
                {price && <p className="property-price">Price: ${price.toLocaleString()}</p>}
            </div>
        </div>
    );
};

export default PropertyCard;