import React, {useEffect, useState} from 'react';
import styles from './AddPropertyForm.module.css';
import Navbar from "./Navbar";
import axios from "axios";

const AddPropertyForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            latitude: '',
            longitude: ''
        },
        price: '',
        size: '',
        numberOfRooms: '',
    });
    const CITIES = ['New Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Bangalore'];

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [images, setImages] = useState([]);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);

    const SuccessBanner = ({ message }) => (
        <div className={styles.successBanner}>
            {message}
        </div>
    );

    useEffect(() => {
        if (showSuccessBanner) {
            const timer = setTimeout(() => {
                setShowSuccessBanner(false);
            }, 5000); // Hide after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [showSuccessBanner]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        Object.keys(formData).forEach(key => {
            if (key === 'address') {
                Object.keys(formData.address).forEach(addressKey => {
                    formDataToSend.append(`address[${addressKey}]`, formData.address[addressKey]);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            console.log("before submitting")
            console.log(formData)
            console.log("before datatosend")
            console.log(formDataToSend)

            formData['landlord'] = localStorage.getItem("userId")

            const response = await axios.post('http://localhost:8000/api/properties/add', formData);
            console.log(response)
            setShowSuccessBanner(true);
            setError(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Add property error:', error);
            setError(true)
            setErrorMessage('Unknown Error occured while adding property')
        }
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        // Reset form after submission
        // setFormData({
        //     title: '',
        //     description: '',
        //     address: '',
        //     price: '',
        //     size: '',
        //     numberOfRooms: '',
        //     images: null
        // });
    };

    return (
        <div className={styles.container}>
            <Navbar />
            {showSuccessBanner && <SuccessBanner message="Property added successfully!" />}

            <h2 className={styles.title}>Add New Property</h2>
            <form onSubmit={handleSubmit} className={styles.propertyForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="street">Street Address</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City</label>
                        <select
                            id="city"
                            name="city"
                            value={formData.address.city}
                            onChange={handleAddressChange}
                            required
                        >
                            <option value="">Select a city</option>
                            {CITIES.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.address.state}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.address.country}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.address.postalCode}
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="latitude">Latitude (optional)</label>
                        <input
                            type="number"
                            id="latitude"
                            name="latitude"
                            value={formData.address.latitude}
                            onChange={handleAddressChange}
                            step="any"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="longitude">Longitude (optional)</label>
                        <input
                            type="number"
                            id="longitude"
                            name="longitude"
                            value={formData.address.longitude}
                            onChange={handleAddressChange}
                            step="any"
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="size">Size (sq ft)</label>
                        <input
                            type="number"
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="numberOfRooms">Number of Rooms</label>
                    <input
                        type="number"
                        id="numberOfRooms"
                        name="numberOfRooms"
                        value={formData.numberOfRooms}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>Add Property</button>
            </form>
        </div>
    );
};

export default AddPropertyForm;