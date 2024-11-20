import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './PropertyDetail.css';

const PropertyDetail = () => {
    const [property, setProperty] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('dmy');
    const [userId, setUserId] = useState('');
    const [hasTenantApplied, setHasTenantApplied] = useState(false)
    const [appliedTenants, setAppliedTenants] = useState([]);



    useEffect(() => {
        const userType = localStorage.getItem("userType")
        const userId = localStorage.getItem("userId")
        setUserType(userType)
        setUserId(userId)

    }, []);

    useEffect(
        () => {
        const fetchPropertyAndTenants = async () => {
            const userType = localStorage.getItem("userType")
            const userId = localStorage.getItem("userId")
            setUserType(userType)
            setUserId(userId)
            try {
                const response = await axios.get(`http://localhost:8000/api/properties/getPropertyById/${id}`);
                setProperty(response.data);

                console.log("printing applied list")
                console.log(response.data.tenantsApplied)
                console.log("dbg cond")
                console.log(userType)
                console.log(userType === 'landlord')
                console.log(response.data.tenantsApplied.length)

                if (userType === 'landlord' && response.data.tenantsApplied.length > 0) {
                    console.log("inside if cond")
                    const tenantsResponse = await axios.get(`http://localhost:8000/api/user/getUsers`, {
                        params: { userIds: response.data.tenantsApplied }
                    });
                    setAppliedTenants(tenantsResponse.data);
                }

            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyAndTenants();
    }, [id]);



    if (!property) {
        return <div>Loading...</div>;
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`http://localhost:8000/api/properties/deletePropertyById/${id}`);
                navigate('/landloardDashboard'); // Navigate back to property list
            } catch (error) {
                console.error('Error deleting property:', error);
            }
        }
    };

    const handleApplyNow = async(e) => {
        e.preventDefault(); // Prevent the link from being followed
        console.log(e)
        console.log(`applying for property ${id}`);

        try {
            const payload = {
                propertyId: id,
                tenantId: userId
            }
            const response = await axios.post(`http://localhost:8000/api/properties/applyProperty`, payload);
            console.log(response.data.message);
            window.alert("Applied for property successfully")
        } catch (error) {
            console.error('Error applying for property:', error);
            window.alert("Error while applying for property")
        }
    };

    const handleEdit = () => {
        // Navigate to edit page
        navigate(`/properties/edit/${id}`);
    };

    const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQACNVbmQg3xxv0QKmUNsuBdFF95uoCBl6Ldg&s";

    return (
        <div className="property-detail-container">
            <div className="property-detail">
                <div className="property-header">
                    <h1 className="property-title"><b>{property.title}</b></h1>
                    {userType === 'landlord' && (
                        <div className="property-actions">
                            <button onClick={handleEdit} className="edit-btn">Edit</button>
                            <button onClick={handleDelete} className="delete-btn">Delete</button>
                        </div>
                    )}

                    {userType === 'tenant' && (
                        hasTenantApplied ? (
                            <button disabled className="applied-button">
                                Applied
                            </button>
                        ) : (
                            <button onClick={(e) => handleApplyNow(e)} className="book-now-button">
                                Apply Now
                            </button>
                        )
                    )}
                </div>
                <div className="property-image-container">
                    <img src={imageUrl} alt={property.title} className="property-image"/>
                </div>
                <div className="property-info">
                    <p className="property-description">{property.description}</p>
                    <p>Address: {property.address.street}, {property.address.city}, {property.address.state}, {property.address.country}, {property.address.postalCode}</p>
                    <p>Number of Rooms: {property.numberOfRooms}</p>
                    <p>Size: {property.size} sq ft</p>
                    <p className="property-price">${property.price.toLocaleString()}</p>
                </div>

                {userType === 'landlord' && appliedTenants.length > 0 && (
                    <div className="applied-tenants-section">
                        <h2>Applied Tenants</h2>
                        <ul className="tenant-list">
                            {appliedTenants.map(tenant => (
                                <li key={tenant._id} className="tenant-item">
                                    <p><strong>Name:</strong> {tenant.username}</p>
                                    <p><strong>Email:</strong> {tenant.email}</p>
                                    {/* Add more tenant details as needed */}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetail;