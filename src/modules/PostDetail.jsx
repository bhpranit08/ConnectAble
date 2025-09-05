import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById, getCommentsByPostId, getCommunityById } from '../data/communities';

const PostDetail = () => {
    const { communityId, postId } = useParams();
    const post = getPostById(postId);
    const comments = getCommentsByPostId(postId);
    const community = getCommunityById(communityId);
    const [newComment, setNewComment] = useState('');
    const [sortComments, setSortComments] = useState('newest');

    if (!post || !community) {
        return (
            <div className="p-4 sm:p-6">
                <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
                    <Link to={`/communities/${communityId}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Back to Community
                    </Link>
                </div>
            </div>
        );
    }

    const sortedComments = [...comments].sort((a, b) => {
        switch (sortComments) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'most-liked':
                return b.likes - a.likes;
            default:
                return 0;
        }
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            console.log('New comment:', newComment);
            setNewComment('');
        }
    };

    const CommentCard = ({ comment }) => (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-start space-x-3">
                <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{comment.author.name}</h4>
                        <span className="text-xs text-gray-500">{comment.author.role}</span>
                        <span className="text-xs text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {comment.likes}
                        </button>
                        <button className="hover:text-blue-600 transition-colors duration-200">Reply</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6">
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Link to="/communities" className="hover:text-blue-600">Communities</Link>
                    <span></span>
                    <Link to={`/communities/${communityId}`} className="hover:text-blue-600">{community.name}</Link>
                    <span></span>
                    <span className="text-gray-800">Post</span>
                </nav>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
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

                <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <div className="prose max-w-none text-gray-700 mb-6">
                    <p className="whitespace-pre-wrap">{post.content}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {post.likes} likes
                        </button>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            {post.comments} comments
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Like
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            Comment
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M15 8a3 3 0 10-6 0 3 3 0 006 0zM6.94 7.94A7.95 7.95 0 0110 4.5c1.5 0 2.87.5 3.94 1.44A7.95 7.95 0 0115 8a7.95 7.95 0 01-1.06 1.56A7.95 7.95 0 0110 11.5c-1.5 0-2.87-.5-3.94-1.44A7.95 7.95 0 015 8a7.95 7.95 0 011.94-1.56z" />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="4"
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Comments ({comments.length})
                    </h3>
                    <select
                        value={sortComments}
                        onChange={(e) => setSortComments(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="most-liked">Most Liked</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {sortedComments.length > 0 ? (
                        sortedComments.map(comment => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h4>
                            <p className="text-gray-500 text-sm">Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;