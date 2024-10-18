
import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import Dashboard from './pages/Dashboard';

const App = () => {
    const { signIn, signOut, state, getDecodedIDToken } = useAuthContext();
    const [userProfile, setUserProfile] = useState({
        username: "",
        name: "",
        email: "",
        country: "",
        phone: ""
    });

    const fetchUserData = async () => {
        const user = await getDecodedIDToken();
        setUserProfile({
            username: user.username,
            name: user.org_name,
            email: user.email,
            country: user.address?.country,
            phone: user.phone_number
        });
    };

    useEffect(() => {
        if (state?.isAuthenticated) {
            fetchUserData();
        }
    }, [state]);

    const [activeTab, setActiveTab] = useState('welcome');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-cover bg-center py-32 absolute top-0 left-0 w-full bg-gray-800">
            <h1 className="text-4xl text-center text-white font-bold mb-6">Vehicle Service Reservation</h1>

            {!state?.isAuthenticated ? (
                <div className="flex flex-col items-center space-y-6">
                                     <p className='mt-10 mb-32 text-center text-xl text-gray-300 font-medium mb-6 px-96'>Welcome to our Vehicle Service Reservation System! Book and manage your vehicle services with ease and security. Sign in to schedule your service and track your reservations effortlessly.</p>
                                     {/* Login with Asgardeo */}
                                    <button
                                        onClick={() => signIn()}
                                        className="bg-blue-600 text-white font-semibold py-3 px-6 mt-14 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 text-lg"
                                    >
                                        Continue with Asgardeo
                                    </button>
                
                                    {/* Register Section */}
                                    <div className="text-center">
                                        <p className="text-gray-200 mt-5 text-lg">Don’t have an account?</p>
                                        <button
                                            className="bg-blue-600 text-white font-semibold py-3 px-6 mt-10 mb-24 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 mt-2 text-lg"
                                        >
                                            <a href='https://asgardeo.io/signup?visitor_id=671116c2ac9c26.96522686&utm_source=site&utm_medium=organic'>
                                                Sign up with Asgardeo
                                            </a>
                                        </button>
                                    </div>
                                </div>
            ) : (
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center text-white">
                    

                    {/* Tab Buttons */}
                    <div className="mb-6">
                        <button
                            onClick={() => handleTabChange('welcome')}
                            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'welcome' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                        >
                            Welcome & User Info
                        </button>
                        <button
                            onClick={() => handleTabChange('reservations')}
                            className={`px-4 py-2 mx-2 rounded-lg ${activeTab === 'reservations' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
                        >
                            Reservations
                        </button>
                    </div>

                    {/* Render content based on active tab */}
                    {activeTab === 'welcome' && (
                        <div>
                           {/* User Info Section */}
                    <div className="mb-6">
                        <p className="text-2xl font-bold mb-4">Welcome, {userProfile.name}!</p>
                        <p className="text-xl font-medium mb-2">User Name: <span className="text-gray-300">{userProfile.username}</span></p>
                        <p className="text-xl font-medium mb-2">Email: <span className="text-gray-300">{userProfile.email}</span></p>
                        <p className="text-xl font-medium mb-2">Phone Number: <span className="text-gray-300">{userProfile.phone}</span></p>
                        <p className="text-xl font-medium mb-4">Country: <span className="text-gray-300">{userProfile.country}</span></p>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-200 mb-4"
                        >
                            Logout
                        </button>
                    </div>
                        </div>
                    )}
                    {activeTab === 'reservations' && (
                        <Dashboard />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;

