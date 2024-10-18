import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react';

const ReservationForm = ({fetchReservations}) => {
    const { getAccessToken, state } = useAuthContext();
    const [token, setToken] = useState('');

    const [formData, setFormData] = useState({
        date: '',
        time: '10:00:00',
        location: '',
        vehicle_no: '',
        mileage: '',
        message: '',
        username: state?.username
    });

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await getAccessToken();
            setToken(accessToken);
        };
        fetchToken();
    }, [getAccessToken]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/reserve', formData, { withCredentials: true });
            setFormData({
                ...formData,
                date: '',
                time: '10:00:00',
                location: '',
                vehicle_no: '',
                mileage: '',
                message: ''

            });
            alert('Reservation created successfully!');
            fetchReservations();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        // <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 space-y-4 max-w-lg mx-auto">
        //     <h2 className="text-xl font-semibold text-center mb-4">Create a Reservation</h2>
        //     <label className="block">
        //         <span className="text-gray-700">Service Date:</span>
        //         <input
        //             type="date"
        //             name="date"
        //             value={formData.date}
        //             onChange={handleChange}
        //             required
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         />
        //     </label>
        //     <label className="block">
        //         <span className="text-gray-700">Preferred Time:</span>
        //         <select
        //             name="time"
        //             value={formData.time}
        //             onChange={handleChange}
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         >
        //             <option value="10:00:00">10 AM</option>
        //             <option value="11:00:00">11 AM</option>
        //             <option value="12:00:00">12 PM</option>
        //         </select>
        //     </label>
        //     <label className="block">
        //         <span className="text-gray-700">Location:</span>
        //         <input
        //             type="text"
        //             name="location"
        //             value={formData.location}
        //             onChange={handleChange}
        //             required
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         />
        //     </label>
        //     <label className="block">
        //         <span className="text-gray-700">Vehicle Registration Number:</span>
        //         <input
        //             type="text"
        //             name="vehicle_no"
        //             value={formData.vehicle_no}
        //             onChange={handleChange}
        //             required
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         />
        //     </label>
        //     <label className="block">
        //         <span className="text-gray-700">Current Mileage:</span>
        //         <input
        //             type="number"
        //             name="mileage"
        //             value={formData.mileage}
        //             onChange={handleChange}
        //             required
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         />
        //     </label>
        //     <label className="block">
        //         <span className="text-gray-700">Message:</span>
        //         <textarea
        //             name="message"
        //             value={formData.message}
        //             onChange={handleChange}
        //             required
        //             className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        //         ></textarea>
        //     </label>
        //     <button
        //         type="submit"
        //         className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        //     >
        //         Submit
        //     </button>
        // </form>
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg p-8 space-y-6 max-w-lg mx-auto rounded-lg">
    <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Create a Reservation</h2>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Service Date:</span>
        <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        />
    </label>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Preferred Time:</span>
        <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        >
            <option value="10:00:00">10 AM</option>
            <option value="11:00:00">11 AM</option>
            <option value="12:00:00">12 PM</option>
        </select>
    </label>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Location:</span>
        <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        />
    </label>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Vehicle Registration Number:</span>
        <input
            type="text"
            name="vehicle_no"
            value={formData.vehicle_no}
            onChange={handleChange}
            required
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        />
    </label>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Current Mileage:</span>
        <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        />
    </label>
    
    <label className="block">
        <span className="text-blue-800 font-medium">Message:</span>
        <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-2 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-200 focus:outline-none"
        ></textarea>
    </label>
    
    <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
    >
        Submit
    </button>
</form>

    );
};

export default ReservationForm;
