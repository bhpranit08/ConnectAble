import React from 'react';

const Home = () => {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Home</h1>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">
                    Welcome to ConnectAble! This is your home dashboard where you can manage your connections and activities.
                </p>
            </div>
        </div>
    );
};

export default Home;