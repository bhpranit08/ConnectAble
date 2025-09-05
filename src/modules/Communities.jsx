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
        <Link to={`/communities/${community.id}`} className="block group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover-lift overflow-hidden border border-white/20 animate-slide-up">
                <div className="h-48 relative overflow-hidden">
                    <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                            </div>
                            <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                                {community.category}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-yellow-200 transition-colors duration-200">{community.name}</h3>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{community.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                                <svg className="w-4 h-4 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                <span className="font-medium text-gray-700">{community.memberCount}</span>
                            </span>
                            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                                <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium text-gray-700">{community.postCount}</span>
                            </span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                            {new Date(community.createdDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {community.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                                {tag}
                            </span>
                        ))}
                        {community.tags.length > 3 && (
                            <span className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                +{community.tags.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8 sm:mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-purple-700 font-medium text-sm">Nepal Disability Communities</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">🏠 Disability Communities</h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <span className="text-2xl">♿</span>
                    <span className="text-2xl">👥</span>
                    <span className="text-2xl">💬</span>
                    <span className="text-2xl">🇳🇵</span>
                </div>
                <p className="text-gray-700 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-4">
                    <strong>Safe spaces for Nepal's disability community to connect, share, and support each other.</strong><br />
                    Join communities based on your interests, disability type, or location in Nepal.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 max-w-2xl mx-auto">
                    <p className="text-purple-800 font-medium">
                        🛡️ Moderated communities with zero tolerance for discrimination 🌈
                    </p>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-white/30">
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