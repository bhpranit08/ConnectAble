
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './modules/Home'
import Jobs from './modules/Jobs'
import Communities from './modules/Communities'
import CommunityDetail from './modules/CommunityDetail'
import PostDetail from './modules/PostDetail'
import Crowdsourcing from './modules/Crowdsourcing'
import CampaignDetail from './modules/CampaignDetail'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const closeSidebar = () => setSidebarOpen(false)

    return (
        <Router>
            <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                
                <div className="flex-1 flex flex-col lg:ml-0 relative z-10">
                    <header className="lg:hidden glass-effect shadow-lg border-b border-white/20 px-4 py-3 relative z-20">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ConnectAble</h1>
                            <div className="w-10"></div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto relative z-10">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/communities" element={<Communities />} />
                            <Route path="/communities/:id" element={<CommunityDetail />} />
                            <Route path="/communities/:communityId/posts/:postId" element={<PostDetail />} />
                            <Route path="/crowdsourcing" element={<Crowdsourcing />} />
                            <Route path="/crowdsourcing/:id" element={<CampaignDetail />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    )
}

export default App
