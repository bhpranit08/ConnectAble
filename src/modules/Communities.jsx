import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { communities } from '../data/communities';

const Communities = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Technology', 'Support', 'Education', 'Travel', 'Business', 'Arts'];

    const filteredCommunities = communities.filter(community => {
        const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            community.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const CommunityCard = ({ community }) => (
        <Link to={`/communities/${community.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="h-48 bg-cover bg-center">
                    <div className="h-full bg-black bg-opacity-30 flex items-end">
                        <div className="p-4 text-white">
                            <img src={community.image} className='' />
                            <h3 className="text-xl font-semibold mb-1">{community.name}</h3>
                            <p className="text-sm opacity-90">{community.category}</p>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                {community.memberCount} members
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                                {community.postCount} posts
                            </span>
                        </div>
                        <span className="text-xs">
                            Created {new Date(community.createdDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {community.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Communities</h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    Connect with like-minded individuals and join communities that interest you
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search Communities
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name or description..."
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
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <p className="text-sm text-gray-600">
                            {filteredCommunities.length} communit{filteredCommunities.length !== 1 ? 'ies' : 'y'} found
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.length > 0 ? (
                    filteredCommunities.map(community => (
                        <CommunityCard key={community.id} community={community} />
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No communities found</h3>
                        <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search criteria or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Communities;