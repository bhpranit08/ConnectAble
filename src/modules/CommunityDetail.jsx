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
            <div className="p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Community Not Found</h1>
                    <p className="text-gray-600 mb-6">The community you're looking for doesn't exist.</p>
                    <Link to="/communities" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Back to Communities
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
        <Link to={`/communities/${id}/posts/${post.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-semibold text-gray-800">{post.author.name}</h4>
                            <p className="text-sm text-gray-500">{post.author.role}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        {post.isPinned && (
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                                Pinned
                            </span>
                        )}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">{post.content}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {post.likes}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            {post.comments}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
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
            <div className="mb-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${community.image})` }}>
                        <div className="h-full bg-black bg-opacity-40 flex items-end">
                            <div className="p-6 text-white">
                                <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
                                <p className="text-lg opacity-90 mb-4">{community.description}</p>
                                <div className="flex items-center space-x-6 text-sm">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                        </svg>
                                        {community.memberCount} members
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                        </svg>
                                        {community.postCount} posts
                                    </span>
                                    <span>Created {new Date(community.createdDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {community.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Community Rules</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {community.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                                    Join Community
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Posts</h2>
                    <div className="flex items-center space-x-4">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="most-liked">Most Liked</option>
                            <option value="most-commented">Most Commented</option>
                        </select>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                            Create Post
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