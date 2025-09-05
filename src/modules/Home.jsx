import React, { useState } from 'react'
import { jobListings } from '../data/jobListings'

const Home = () => {
    const [recentJobs] = useState(jobListings.slice(0, 3)) // Show 3 most recent jobs

    const StatCard = ({ title, value, icon, gradient = "gradient-blue" }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 hover-lift animate-fade-in border border-white/20">
            <div className="flex items-center">
                <div className={`p-3 rounded-xl ${gradient} shadow-lg`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="ml-4">
                    <p className="text-sm sm:text-base font-medium text-gray-600">{title}</p>
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{value}</p>
                </div>
            </div>
        </div>
    );

    const QuickActionCard = ({ title, description, icon, gradient = "gradient-blue", onClick }) => (
        <div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 hover-lift cursor-pointer border border-white/20 group animate-slide-up"
            onClick={onClick}
        >
            <div className="flex items-start">
                <div className={`p-3 rounded-xl ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">{title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{description}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );

    const RecentJobCard = ({ job }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 hover-lift border border-white/20 group animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-200">{job.title}</h3>
                    <p className="text-sm sm:text-base text-indigo-600 font-semibold">{job.company}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location} • {job.type}
                    </div>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{job.salary}</p>
                    <p className="text-xs text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
            <div className="flex flex-wrap gap-2">
                {job.accommodations.slice(0, 3).map((accommodation, index) => (
                    <span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                        {accommodation}
                    </span>
                ))}
                {job.accommodations.length > 3 && (
                    <span className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        +{job.accommodations.length - 3} more
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 min-h-screen">
            <div className="mb-8 sm:mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-green-100 px-4 py-2 rounded-full mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="text-blue-700 font-medium text-sm">🦽 Accessibility-First Platform for Nepal</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    ConnectAble Nepal
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                    <span className="text-2xl">♿</span>
                    <span className="text-2xl">🤝</span>
                    <span className="text-2xl">💼</span>
                    <span className="text-2xl">🏠</span>
                </div>
                <p className="text-gray-700 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-4">
                    <strong>The premier job and community platform for people with disabilities in Nepal.</strong><br/>
                    Connecting talented individuals with inclusive employers and supportive communities.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 max-w-2xl mx-auto">
                    <p className="text-blue-800 font-medium">
                        🌟 Designed by and for the disability community in Nepal 🇳🇵
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <StatCard
                    title="♿ Accessible Jobs"
                    value={jobListings.length}
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    }
                    gradient="gradient-blue"
                />
                <StatCard
                    title="🏢 Inclusive Employers"
                    value="8+"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                        </svg>
                    }
                    gradient="gradient-green"
                />
                <StatCard
                    title="🛠️ Accommodations"
                    value="15+"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                        </svg>
                    }
                    gradient="gradient-purple"
                />
                <StatCard
                    title="🎉 Success Stories"
                    value="50+"
                    icon={
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                    }
                    gradient="gradient-orange"
                />
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/30">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">🚀 Start Your Journey</h2>
                    <p className="text-gray-600">Empowering people with disabilities in Nepal</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <QuickActionCard
                        title="♿ Find Accessible Jobs"
                        description="Discover employers committed to disability inclusion"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        }
                        gradient="gradient-blue"
                        onClick={() => window.location.href = '/jobs'}
                    />
                    <QuickActionCard
                        title="🤝 Join Disability Communities"
                        description="Connect with others who share your experiences"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 8H16c-.8 0-1.5.7-1.5 1.5v3.5c0 1.1-.9 2-2 2s-2-.9-2-2V10c0-.8-.7-1.5-1.5-1.5H7.5c-.8 0-1.5.7-1.5 1.5v3.5c0 1.1-.9 2-2 2s-2-.9-2-2v-3.5C2 9.7 2.7 9 3.5 9H6c.8 0 1.5-.7 1.5-1.5S6.8 6 6 6H3.5C2.1 6 1 7.1 1 8.5V13c0 2.2 1.8 4 4 4s4-1.8 4-4v-1.5c0-.3.2-.5.5-.5s.5.2.5.5V13c0 2.2 1.8 4 4 4s4-1.8 4-4v-1.5c0-.3.2-.5.5-.5s.5.2.5.5V22h2z"/>
                            </svg>
                        }
                        gradient="gradient-green"
                        onClick={() => window.location.href = '/communities'}
                    />
                    <QuickActionCard
                        title="🛡️ Access Support Services"
                        description="Get help with accommodations and resources"
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                            </svg>
                        }
                        gradient="gradient-purple"
                    />
                    <QuickActionCard
                        title="💝 Support Community Campaigns"
                        description="Help fund accessibility equipment and medical needs"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        gradient="gradient-orange"
                        onClick={() => window.location.href = '/crowdsourcing'}
                    />
                </div>
            </div>

            <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Recent Job Opportunities</h2>
                        <p className="text-gray-600">Latest inclusive job postings from our partners</p>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/jobs'}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                    >
                        <span>View All Jobs</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-6">
                    {recentJobs.length > 0 ? (
                        recentJobs.map(job => (
                            <RecentJobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-white/30">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No recent jobs</h3>
                            <p className="text-gray-500 text-base">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/30">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">🌟 Why ConnectAble Nepal?</h2>
                    <p className="text-gray-600">The first platform built specifically for Nepal's disability community</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-blue p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <div className="text-white text-2xl">♿</div>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">🛠️ Accessibility First</h3>
                        <p className="text-gray-600 leading-relaxed">Every feature designed with screen readers, keyboard navigation, and assistive technologies in mind.</p>
                    </div>
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-green p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <div className="text-white text-2xl">🤝</div>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">🏠 Disability Community</h3>
                        <p className="text-gray-600 leading-relaxed">Connect with others who share similar experiences and challenges in Nepal's disability community.</p>
                    </div>
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-purple p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <div className="text-white text-2xl">🇳🇵</div>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">🏔️ Nepal-Specific</h3>
                        <p className="text-gray-600 leading-relaxed">Understanding Nepal's unique challenges, culture, and opportunities for people with disabilities.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home