
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';
import { useAuthContext } from '@asgardeo/auth-react';

const Dashboard = () => {
    const { getAccessToken, state, getIDToken, getBasicUserInfo, getDecodedIDToken } = useAuthContext();
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 3;

    // Fetch reservations
    const fetchReservations = async () => {
        const token = await getAccessToken();
        const IDtoken = await getIDToken();
        const userInfo = await getBasicUserInfo();
        const user = await getDecodedIDToken();
        console.log(token);
        console.log(IDtoken);
        console.log(userInfo);
        console.log(user.address.country);
        const config = {
            headers: { Authorization: `Bearer ${IDtoken}` }
        };
        try {
            const response = await axios.get('http://localhost:8000/api/reservations', {
                params: { username: state?.username },
                withCredentials: true,
                ...config
            });
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    // Handle reservation deletion
    const deleteReservation = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/reservations/${id}`, {
                params: { username: state?.username },
                withCredentials: true
            });
            setReservations(reservations.filter(reservation => reservation.booking_id !== id));
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    // Pagination logic
    const indexOfLastReservation = currentPage * reservationsPerPage;
    const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
    const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-10 h-screen w-full bg-gray-50">
            {/* Flex container for side-by-side layout */}
            <div className="flex flex-col lg:flex-row gap-20 w-full">

                {/* Reservation Form Section */}
                <div className="flex-grow bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Create a Reservation</h2>
                    <ReservationForm fetchReservations={fetchReservations} />
                </div>

                {/* Reservations List Section */}
                <div className="flex-grow bg-white p-8 shadow-lg rounded-lg">
                    {reservations.length > 0 ? (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold mb-4">Your Reservations</h2>
                            <ul className="space-y-4">
                                {currentReservations.map((reservation) => {
                                    const currentDate = new Date(); // Get the current date
                                    const reservationDate = new Date(reservation.date); // Convert reservation date to a Date object

                                    return (
                                        <li key={reservation.booking_id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                            <div className="grid grid-cols-2 gap-4">
                                                <p className="font-medium">Service Date:</p>
                                                <p>{reservationDate.toLocaleDateString()}</p>
                                                <p className="font-medium">Location:</p>
                                                <p>{reservation.location}</p>
                                                <p className="font-medium">Vehicle No:</p>
                                                <p>{reservation.vehicle_no}</p>
                                                <p className="font-medium">Mileage:</p>
                                                <p>{reservation.mileage}</p>
                                                <p className="font-medium">Message:</p>
                                                <p>{reservation.message}</p>
                                            </div>

                                            {/* Conditionally render the Delete button for future reservations */}
                                            {reservationDate > currentDate ? (
                                                <button
                                                    onClick={() => deleteReservation(reservation.booking_id)}
                                                    className="mt-4 w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                <p className="mt-4 text-sm text-gray-500">Past reservations cannot be deleted.</p>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <Pagination
                                reservationsPerPage={reservationsPerPage}
                                totalReservations={reservations.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No reservations found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Pagination Component
const Pagination = ({ reservationsPerPage, totalReservations, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalReservations / reservationsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? "text-blue-600 font-bold" : ""}>
                        <button
                            onClick={() => paginate(number)}
                            className="bg-gray-200 hover:bg-gray-300 text-black py-1 px-3 rounded focus:outline-none"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Dashboard;
