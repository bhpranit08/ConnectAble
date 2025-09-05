
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './modules/Home';
import Jobs from './modules/Jobs';
import Communities from './modules/Communities';

function App() {
    return (
        <Router>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/communities" element={<Communities />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
