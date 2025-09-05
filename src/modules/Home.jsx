import React, { useState } from 'react';
import { jobListings } from '../data/jobListings';

const Home = () => {
    const [recentJobs] = useState(jobListings.slice(0, 3)); // Show 3 most recent jobs

    const StatCard = ({ title, value, icon, color = "blue" }) => (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm sm:text-base font-medium text-gray-600">{title}</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const QuickActionCard = ({ title, description, icon, color = "blue", onClick }) => (
        <div 
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex items-start">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    {icon}
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );

    const RecentJobCard = ({ job }) => (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                    <p className="text-sm sm:text-base text-blue-600 font-medium">{job.company}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{job.location} • {job.type}</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-sm sm:text-base font-semibold text-green-600">{job.salary}</p>
                    <p className="text-xs text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
            <div className="flex flex-wrap gap-1">
                {job.accommodations.slice(0, 3).map((accommodation, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                        {accommodation}
                    </span>
                ))}
                {job.accommodations.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{job.accommodations.length - 3} more
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6">
            {/* Hero Section */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome to ConnectAble</h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    Your inclusive platform for connecting with opportunities, communities, and support in Nepal
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <StatCard
                    title="Active Jobs"
                    value={jobListings.length}
                    icon={
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                    }
                    color="blue"
                />
                <StatCard
                    title="Companies"
                    value="8+"
                    icon={
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                    color="green"
                />
                <StatCard
                    title="Accessibility Features"
                    value="5+"
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    color="purple"
                />
                <StatCard
                    title="Success Stories"
                    value="50+"
                    icon={
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    }
                    color="orange"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickActionCard
                        title="Browse Jobs"
                        description="Find inclusive employment opportunities"
                        icon={
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                        }
                        color="blue"
                        onClick={() => window.location.href = '/jobs'}
                    />
                    <QuickActionCard
                        title="Join Communities"
                        description="Connect with like-minded individuals"
                        icon={
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                        color="green"
                        onClick={() => window.location.href = '/communities'}
                    />
                    <QuickActionCard
                        title="Get Support"
                        description="Access resources and assistance"
                        icon={
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                            </svg>
                        }
                        color="purple"
                    />
                </div>
            </div>

            {/* Recent Job Opportunities */}
            <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Recent Job Opportunities</h2>
                    <button 
                        onClick={() => window.location.href = '/jobs'}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                    >
                        View All Jobs →
                    </button>
                </div>
                <div className="space-y-4">
                    {recentJobs.length > 0 ? (
                        recentJobs.map(job => (
                            <RecentJobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent jobs</h3>
                            <p className="text-gray-500 text-sm sm:text-base">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Why Choose ConnectAble?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Inclusive Design</h3>
                        <p className="text-sm text-gray-600">Built with accessibility in mind, ensuring everyone can participate fully.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Community Support</h3>
                        <p className="text-sm text-gray-600">Connect with others who understand your journey and challenges.</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-3">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Nepal-Focused</h3>
                        <p className="text-sm text-gray-600">Tailored specifically for the Nepalese job market and culture.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;