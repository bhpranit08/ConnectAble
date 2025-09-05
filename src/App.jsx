
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './modules/Home';
import Jobs from './modules/Jobs';
import Communities from './modules/Communities';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <Router>
            <div className="flex h-screen bg-gray-100">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                
                <div className="flex-1 flex flex-col lg:ml-0 relative z-10">
                    <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 relative z-20">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-lg font-semibold text-gray-800">ConnectAble</h1>
                            <div className="w-10"></div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto relative z-10">
                        <Routes>
                            <Route path="/*" element={<Home />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/communities" element={<Communities />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
