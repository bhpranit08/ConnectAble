import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { campaigns, categories } from '../data/crowdsourcing'

const Crowdsourcing = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('newest')

    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory
        return matchesSearch && matchesCategory
    }).sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdDate) - new Date(a.createdDate)
            case 'ending-soon':
                return a.daysLeft - b.daysLeft
            case 'most-funded':
                return (b.raisedAmount / b.targetAmount) - (a.raisedAmount / a.targetAmount)
            case 'most-supporters':
                return b.supporters - a.supporters
            default:
                return 0
        }
    })

    const CampaignCard = ({ campaign }) => {
        const progressPercentage = (campaign.raisedAmount / campaign.targetAmount) * 100
        const urgencyColor = {
            high: 'bg-red-100 text-red-800 border-red-200',
            medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            low: 'bg-green-100 text-green-800 border-green-200'
        }

        return (
            <Link to={`/crowdsourcing/${campaign.id}`} className="block group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover-lift border border-white/20 animate-slide-up overflow-hidden">
                    <div className="h-48 relative overflow-hidden">
                        <img 
                            src={campaign.image} 
                            alt={campaign.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${urgencyColor[campaign.urgency]}`}>
                                {campaign.urgency === 'high' ? '🚨 Urgent' : campaign.urgency === 'medium' ? '⏰ Important' : '📅 Ongoing'}
                            </span>
                        </div>
                        <div className="absolute top-4 right-4">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                                {campaign.category}
                            </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <img
                                    src={campaign.organizer.avatar}
                                    alt={campaign.organizer.name}
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <div className="text-white">
                                    <p className="text-sm font-medium">{campaign.organizer.name}</p>
                                    {campaign.organizer.verified && (
                                        <span className="text-xs opacity-90">✓ Verified</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                            {campaign.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {campaign.description}
                        </p>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    NPR {campaign.raisedAmount.toLocaleString()} raised
                                </span>
                                <span className="text-sm text-gray-500">
                                    {progressPercentage.toFixed(0)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                <span>Goal: NPR {campaign.targetAmount.toLocaleString()}</span>
                                <span>{campaign.daysLeft} days left</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">{campaign.supporters}</span>
                                </span>
                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">{campaign.location.split(',')[0]}</span>
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {campaign.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8 sm:mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4">
                    <span className="text-2xl">💝</span>
                    <span className="text-orange-700 font-medium text-sm">Community Support Nepal</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    🤲 Crowdsourcing for Accessibility
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <span className="text-2xl">♿</span>
                    <span className="text-2xl">💰</span>
                    <span className="text-2xl">🤝</span>
                    <span className="text-2xl">🇳🇵</span>
                </div>
                <p className="text-gray-700 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-4">
                    <strong>Help fund accessibility equipment, medical needs, and support for Nepal's disability community.</strong><br/>
                    Every contribution makes a difference in someone's life.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 max-w-2xl mx-auto">
                    <p className="text-orange-800 font-medium">
                        🛡️ All campaigns verified • 💯 Transparent funding • 🎯 Direct impact
                    </p>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 mb-8 border border-white/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            🔍 Search Campaigns
                        </label>
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📂 Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📊 Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm"
                        >
                            <option value="newest">Newest First</option>
                            <option value="ending-soon">Ending Soon</option>
                            <option value="most-funded">Most Funded</option>
                            <option value="most-supporters">Most Supporters</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <div className="w-full">
                            <p className="text-sm text-gray-600 mb-2">
                                📈 {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
                            </p>
                            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                                ➕ Start Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))
                ) : (
                    <div className="col-span-full bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-white/30 animate-fade-in">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns found</h3>
                        <p className="text-gray-500 text-base">Try adjusting your search criteria or filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Crowdsourcing