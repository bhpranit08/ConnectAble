import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCampaignById } from '../data/crowdsourcing'

const CampaignDetail = () => {
    const { id } = useParams()
    const campaign = getCampaignById(id)
    const [donationAmount, setDonationAmount] = useState('')
    const [showDonationForm, setShowDonationForm] = useState(false)

    if (!campaign) {
        return (
            <div className="p-4 sm:p-6 min-h-screen">
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-white/30 animate-fade-in">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Campaign Not Found</h1>
                    <p className="text-gray-600 mb-8 text-lg">The campaign you're looking for doesn't exist or may have been removed.</p>
                    <Link to="/crowdsourcing" className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Campaigns</span>
                    </Link>
                </div>
            </div>
        )
    }

    const progressPercentage = (campaign.raisedAmount / campaign.targetAmount) * 100
    const urgencyColor = {
        high: 'bg-red-100 text-red-800 border-red-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        low: 'bg-green-100 text-green-800 border-green-200'
    }

    const quickAmounts = [500, 1000, 2500, 5000, 10000]

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/30 animate-fade-in">
                    <div className="h-64 sm:h-96 relative overflow-hidden">
                        <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute top-6 left-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${urgencyColor[campaign.urgency]}`}>
                                {campaign.urgency === 'high' ? '🚨 Urgent Campaign' : campaign.urgency === 'medium' ? '⏰ Important Campaign' : '📅 Ongoing Campaign'}
                            </span>
                        </div>
                        <div className="absolute top-6 right-6">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                                {campaign.category}
                            </span>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{campaign.title}</h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={campaign.organizer.avatar}
                                    alt={campaign.organizer.name}
                                    className="w-12 h-12 rounded-full border-2 border-white"
                                />
                                <div>
                                    <p className="font-semibold">{campaign.organizer.name}</p>
                                    <div className="flex items-center space-x-2 text-sm opacity-90">
                                        {campaign.organizer.verified && <span>✓ Verified</span>}
                                        <span>•</span>
                                        <span>{campaign.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Campaign Story</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{campaign.story}</p>
                        <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">🏷️ Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {campaign.tags.map(tag => (
                                <span key={tag} className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Campaign Updates ({campaign.updates})</h2>
                        <div className="space-y-4">
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="font-semibold text-gray-800">Campaign launched successfully!</p>
                                <p className="text-sm text-gray-600">Thank you for your support. We're excited to start this journey together.</p>
                                <p className="text-xs text-gray-500 mt-2">{new Date(campaign.createdDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 sticky top-6">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl font-bold text-gray-800">
                                    NPR {campaign.raisedAmount.toLocaleString()}
                                </span>
                                <span className="text-lg text-gray-600">
                                    {progressPercentage.toFixed(0)}%
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">raised of NPR {campaign.targetAmount.toLocaleString()} goal</p>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                ></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{campaign.supporters}</p>
                                    <p className="text-sm text-gray-600">supporters</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{campaign.daysLeft}</p>
                                    <p className="text-sm text-gray-600">days left</p>
                                </div>
                            </div>
                        </div>

                        {!showDonationForm ? (
                            <button
                                onClick={() => setShowDonationForm(true)}
                                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                💝 Donate Now
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800">💰 Choose Amount (NPR)</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {quickAmounts.map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => setDonationAmount(amount.toString())}
                                            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${donationAmount === amount.toString()
                                                ? 'bg-orange-100 border-orange-300 text-orange-800'
                                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            NPR {amount.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Custom amount"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Donate NPR {donationAmount ? parseInt(donationAmount).toLocaleString() : '0'}
                                </button>
                                <button
                                    onClick={() => setShowDonationForm(false)}
                                    className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium mb-3">
                                📤 Share Campaign
                            </button>
                            <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
                                🚨 Report Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignDetail