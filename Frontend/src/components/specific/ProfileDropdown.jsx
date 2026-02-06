import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiUser, HiCog, HiLogout, HiChevronDown } from 'react-icons/hi';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { logout } = useAuth();

    // Get user info from localStorage
    const userPhoto = localStorage.getItem('userPhoto');
    const userName = localStorage.getItem('userName') || 'User';
    const userInitial = userName.charAt(0).toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = () => {
        logout();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
            >
                {userPhoto ? (
                    <img
                        src={userPhoto}
                        alt="Profile"
                        className="h-9 w-9 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
                    />
                ) : (
                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm border border-indigo-200">
                        {userInitial}
                    </div>
                )}
                <HiChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900">{userName}</p>
                        <p className="text-xs text-slate-500 truncate">{localStorage.getItem('userEmail') || 'user@example.com'}</p>
                    </div>
                    
                    <Link
                        to="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <HiUser className="mr-3 h-5 w-5 text-slate-400" />
                        Your Profile
                    </Link>
                    
                    <Link
                        to="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <HiCog className="mr-3 h-5 w-5 text-slate-400" />
                        Settings
                    </Link>
                    
                    <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors border-t border-slate-100"
                    >
                        <HiLogout className="mr-3 h-5 w-5 text-rose-500" />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;