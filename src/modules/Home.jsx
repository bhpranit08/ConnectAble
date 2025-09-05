import React, { useState } from 'react'
import { jobListings } from '../data/jobListings'

const Home = () => {
    const [recentJobs] = useState(jobListings.slice(0, 3)) // Show 3 most recent jobs
    const [aiMessages, setAiMessages] = useState([
        { role: 'assistant', text: "Hi! I can help you find jobs, communities, or support. Ask me anything." }
    ])
    const [aiInput, setAiInput] = useState('')
    const [isThinking, setIsThinking] = useState(false)

    const generateAiReply = (text) => {
        const lower = text.toLowerCase()
        if (lower.includes('job')) {
            return "You can browse inclusive roles on the Jobs page. Try filters by category or accessibility."
        }
        if (lower.includes('community')) {
            return "Our Communities section helps you connect with groups and discussions."
        }
        if (lower.includes('support') || lower.includes('help')) {
            return "For assistance, check the Support quick action or tell me what you need."
        }
        return "I’m here to help. You can ask about jobs, communities, or resources."
    }

    const sendAiMessage = (e) => {
        if (e) e.preventDefault()
        const text = aiInput.trim()
        if (!text || isThinking) return
        setAiMessages(prev => [...prev, { role: 'user', text }])
        setAiInput('')
        setIsThinking(true)
        setTimeout(() => {
            const reply = generateAiReply(text)
            setAiMessages(prev => [...prev, { role: 'assistant', text: reply }])
            setIsThinking(false)
        }, 600)
    }

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
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                    <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-indigo-700 font-medium text-sm">Empowering Nepal's Inclusive Future</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    Welcome to ConnectAble
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                    Your inclusive platform for connecting with opportunities, communities, and support in Nepal. 
                    Building bridges to a more accessible future.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <StatCard
                    title="Active Jobs"
                    value={jobListings.length}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                    }
                    gradient="gradient-blue"
                />
                <StatCard
                    title="Companies"
                    value="8+"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                    gradient="gradient-green"
                />
                <StatCard
                    title="Accessibility Features"
                    value="5+"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    gradient="gradient-purple"
                />
                <StatCard
                    title="Success Stories"
                    value="50+"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    }
                    gradient="gradient-orange"
                />
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 border border-white/30">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Quick Actions</h2>
                    <p className="text-gray-600">Get started with these popular features</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <QuickActionCard
                        title="Browse Jobs"
                        description="Find inclusive employment opportunities"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                        }
                        gradient="gradient-blue"
                        onClick={() => window.location.href = '/jobs'}
                    />
                    <QuickActionCard
                        title="Join Communities"
                        description="Connect with like-minded individuals"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        }
                        gradient="gradient-green"
                        onClick={() => window.location.href = '/communities'}
                    />
                    <QuickActionCard
                        title="Get Support"
                        description="Access resources and assistance"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                            </svg>
                        }
                        gradient="gradient-purple"
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
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Why Choose ConnectAble?</h2>
                    <p className="text-gray-600">Discover what makes us the leading inclusive platform in Nepal</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-blue p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">Inclusive Design</h3>
                        <p className="text-gray-600 leading-relaxed">Built with accessibility in mind, ensuring everyone can participate fully in Nepal's digital economy.</p>
                    </div>
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-green p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">Community Support</h3>
                        <p className="text-gray-600 leading-relaxed">Connect with others who understand your journey and challenges in a supportive environment.</p>
                    </div>
                    <div className="text-center group animate-slide-up">
                        <div className="gradient-purple p-4 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-3 text-lg">Nepal-Focused</h3>
                        <p className="text-gray-600 leading-relaxed">Tailored specifically for the Nepalese job market, culture, and accessibility needs.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/30 mt-8 sm:mt-12">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <div className="mb-4">
                            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">AI Help</h2>
                            <p className="text-gray-600">Ask questions about jobs, communities, or support. I’ll guide you.</p>
                        </div>
                        <div className="bg-white/80 rounded-2xl border border-white/30 shadow-inner p-4 sm:p-5 h-80 overflow-y-auto space-y-3">
                            {aiMessages.map((m, idx) => (
                                <div key={idx} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                                    <div className={m.role === 'user' ? 'max-w-[85%] gradient-blue text-white px-3 py-2 rounded-xl rounded-br-sm shadow' : 'max-w-[85%] bg-white/90 text-gray-800 px-3 py-2 rounded-xl rounded-bl-sm shadow border border-white/40'}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] bg-white/90 text-gray-800 px-3 py-2 rounded-xl rounded-bl-sm shadow border border-white/40">
                                        <span className="inline-flex items-center gap-2">
                                            <svg className="w-4 h-4 text-indigo-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                                            Thinking...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <form onSubmit={sendAiMessage} className="mt-4 flex items-center gap-2">
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                placeholder="Ask me about jobs, communities, or support..."
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80"
                            />
                            <button
                                type="submit"
                                disabled={isThinking}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow disabled:opacity-60"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                    <div className="w-full lg:max-w-sm">
                        <div className="bg-white/80 rounded-2xl border border-white/30 shadow p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Try asking:</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Show me remote jobs","What communities can I join?","How do I get support?","Jobs with flexible hours"].map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setAiInput(q); setTimeout(() => sendAiMessage(), 0) }}
                                        className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                Responses are AI-generated for guidance. For detailed info, see Jobs or Communities.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home