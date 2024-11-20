import React, {useEffect, useState} from 'react';
import TenantNavBar from "./TenantNavBar";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import BookingApplicationCard from "./BookingApplicationCard";

const TenantApplication = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const tenantId = localStorage.getItem("userId")
            // Replace with your actual API endpoint
            const response = await axios.get(`http://localhost:8000/api/bookings/getBooking/${tenantId}`);
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch bookings. Please try again later.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <TenantNavBar />
            <h2>Your Booking Applications</h2>
            {bookings.length === 0 ? (
                <p>You haven't applied for any bookings yet.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <BookingApplicationCard booking={booking}/>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TenantApplication;