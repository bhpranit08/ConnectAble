import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCommunityById, getPostsByCommunityId } from '../data/communities';

const CommunityDetail = () => {
    const { id } = useParams();
    const community = getCommunityById(id);
    const posts = getPostsByCommunityId(id);
    const [sortBy, setSortBy] = useState('newest');

    if (!community) {
        return (
            <div className="p-4 sm:p-6 min-h-screen">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-white/30 animate-fade-in">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Community Not Found</h1>
                    <p className="text-gray-600 mb-8 text-lg">The community you're looking for doesn't exist or may have been removed.</p>
                    <Link to="/communities" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Communities</span>
                    </Link>
                </div>
            </div>
        );
    }

    const sortedPosts = [...posts].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'most-liked':
                return b.likes - a.likes;
            case 'most-commented':
                return b.comments - a.comments;
            default:
                return 0;
        }
    });

    const PostCard = ({ post }) => (
        <Link to={`/communities/${id}/posts/${post.id}`} className="block group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 mb-4 hover-lift border border-white/20 animate-slide-up">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                        />
                        <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">{post.author.name}</h4>
                            <p className="text-sm text-gray-500 font-medium">{post.author.role}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        {post.isPinned && (
                            <span className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium border border-yellow-200">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                </svg>
                                Pinned
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-200">{post.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold text-gray-700">{post.likes}</span>
                        </span>
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold text-gray-700">{post.comments}</span>
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                                {tag}
                            </span>
                        ))}
                        {post.tags.length > 2 && (
                            <span className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                +{post.tags.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/30 animate-fade-in">
                    <div className="h-64 sm:h-80 relative overflow-hidden">
                        <img
                            src={community.image}
                            alt={community.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                    {community.category}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{community.name}</h1>
                            <p className="text-lg opacity-90 mb-4 leading-relaxed">{community.description}</p>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                                <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                    <span className="font-semibold">{community.memberCount}</span>
                                    <span className="ml-1">members</span>
                                </span>
                                <span className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold">{community.postCount}</span>
                                    <span className="ml-1">posts</span>
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    Created {new Date(community.createdDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {community.tags.map(tag => (
                                <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Community Rules
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-3">
                                    {community.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="leading-relaxed">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Join Community</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-white/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Community Posts</h2>
                        <p className="text-gray-600">Join the conversation and share your thoughts</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="most-liked">Most Liked</option>
                            <option value="most-commented">Most Commented</option>
                        </select>
                        <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Create Post</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {sortedPosts.length > 0 ? (
                    sortedPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                        <p className="text-gray-500 text-sm sm:text-base">Be the first to start a conversation in this community!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityDetail;