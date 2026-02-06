import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import Sidebar from './Sidebar';
import ProfileDropdown from '../specific/ProfileDropdown';

const DashboardLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - hidden on mobile, shown with toggle */}
            <div className={`fixed inset-y-0 left-0 z-50 lg:z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main content */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 border-b border-slate-200">
                     <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <HiMenu className="h-6 w-6" />
                        </button>
                        
                        <Link to="/" className="lg:hidden text-2xl font-black text-indigo-600 flex items-center gap-2">
                            ⚡
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 hidden sm:block">{title}</h1>
                     </div>
                     
                     <div className="flex items-center space-x-4">
                        <button className="p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                             <span className="sr-only">View notifications</span>
                             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <ProfileDropdown />
                     </div>
                </header>
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    {/* Render nested routes here */}
                    <Outlet />
                    {/* Fallback to children prop for backward compatibility */}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;