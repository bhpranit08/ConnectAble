import React, { useState, useEffect } from 'react';
import { jobListings, jobCategories, accessibilityFeatures } from '../data/jobListings';

const Jobs = () => {
    const [jobs, setJobs] = useState(jobListings);
    const [filteredJobs, setFilteredJobs] = useState(jobListings);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedAccessibility, setSelectedAccessibility] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        let filtered = jobs;

        if (searchTerm) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(job => {
                const categoryMap = {
                    'Technology': ['Software Developer', 'Data Entry Specialist'],
                    'Customer Service': ['Customer Service Representative'],
                    'Design': ['Graphic Designer'],
                    'Marketing': ['Digital Marketing Coordinator'],
                    'Writing': ['Content Writer'],
                    'Tourism': ['Tourism Guide'],
                    'Education': ['Education Coordinator']
                };
                return categoryMap[selectedCategory]?.some(title => job.title.includes(title));
            });
        }

        if (selectedAccessibility.length > 0) {
            filtered = filtered.filter(job =>
                selectedAccessibility.every(feature => {
                    const featureMap = {
                        'Wheelchair Accessible': job.accessibility.wheelchairAccessible,
                        'Remote Work': job.accessibility.remoteWork,
                        'Flexible Hours': job.accessibility.flexibleHours,
                        'Assistive Technology': job.accessibility.assistiveTech,
                        'Mental Health Support': job.accessibility.mentalHealthSupport
                    };
                    return featureMap[feature];
                })
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.postedDate) - new Date(a.postedDate);
                case 'oldest':
                    return new Date(a.postedDate) - new Date(b.postedDate);
                case 'salary-high':
                    return parseInt(b.salary.replace(/[^0-9]/g, '')) - parseInt(a.salary.replace(/[^0-9]/g, ''));
                case 'salary-low':
                    return parseInt(a.salary.replace(/[^0-9]/g, '')) - parseInt(b.salary.replace(/[^0-9]/g, ''));
                default:
                    return 0;
            }
        });

        setFilteredJobs(filtered);
    }, [jobs, searchTerm, selectedCategory, selectedAccessibility, sortBy]);

    const handleAccessibilityChange = (feature) => {
        setSelectedAccessibility(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const JobCard = ({ job }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-6 hover-lift border border-white/20 group animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">{job.title}</h3>
                    <p className="text-base sm:text-lg text-indigo-600 font-semibold">{job.company}</p>
                    <div className="flex items-center text-sm sm:text-base text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location} • {job.type}
                    </div>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{job.salary}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{job.description}</p>

            <div className="mb-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm sm:text-base flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Requirements:
                </h4>
                <ul className="space-y-2 text-sm sm:text-base">
                    {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {req}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3 text-sm sm:text-base flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Accessibility Accommodations:
                </h4>
                <div className="flex flex-wrap gap-2">
                    {job.accommodations.map((accommodation, index) => (
                        <span
                            key={index}
                            className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-2 rounded-full text-xs sm:text-sm font-medium border border-blue-200"
                        >
                            {accommodation}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                        Apply Now
                    </button>
                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base font-medium">
                        Save Job
                    </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8 sm:mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    <span className="text-indigo-700 font-medium text-sm">Inclusive Employment</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Job Opportunities</h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                    Find inclusive employment opportunities designed for people with disabilities in Nepal
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-white/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Jobs
                        </label>
                        <input
                            type="text"
                            placeholder="Job title, company, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        >
                            {jobCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="salary-high">Salary: High to Low</option>
                            <option value="salary-low">Salary: Low to High</option>
                        </select>
                    </div>

                    <div className="flex items-end sm:col-span-2 lg:col-span-1">
                        <p className="text-sm text-gray-600">
                            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accessibility Features
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                        {accessibilityFeatures.map(feature => (
                            <label key={feature} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedAccessibility.includes(feature)}
                                    onChange={() => handleAccessibilityChange(feature)}
                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search criteria or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;