import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation()

    const menuItems = [
        {
            name: 'Home',
            path: '/',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {   
            name: 'Jobs',
            path: '/jobs',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
            )
        },
        {
            name: 'Communities',
            path: '/communities',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ]

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={onClose}
                ></div>
            )}
            
            <div className={`
                fixed lg:static inset-y-0 left-0 z-30 w-64 gradient-bg text-white min-h-screen
                transform transition-transform duration-300 ease-in-out shadow-2xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <span className="text-white text-lg">♿</span>
                            </div>
                            <h1 className="text-xl lg:text-2xl font-bold text-white">ConnectAble </h1>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-white/70 hover:text-white transition-colors duration-200 p-1"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <nav className="mt-6">
                    <ul className="space-y-2 px-3">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={onClose}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                                        location.pathname === item.path
                                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span className={`mr-3 transition-transform duration-200 ${
                                        location.pathname === item.path ? 'scale-110' : 'group-hover:scale-105'
                                    }`}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                
                <div className="absolute bottom-6 left-3 right-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <p className="text-white/80 text-sm mb-2">🛠️ Accessibility Support</p>
                        <button className="text-white text-sm font-medium hover:text-white/80 transition-colors duration-200">
                            Get Help
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar