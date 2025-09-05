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
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                    <p className="text-base sm:text-lg text-blue-600 font-medium">{job.company}</p>
                    <p className="text-sm sm:text-base text-gray-600">{job.location} • {job.type}</p>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-base sm:text-lg font-semibold text-green-600">{job.salary}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-4">{job.description}</p>

            <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Accessibility Accommodations:</h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                    {job.accommodations.map((accommodation, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                            {accommodation}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base">
                        Apply Now
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base">
                        Save Job
                    </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Job Opportunities</h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    Find inclusive employment opportunities designed for people with disabilities
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
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