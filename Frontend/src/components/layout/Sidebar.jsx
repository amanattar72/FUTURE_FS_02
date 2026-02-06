import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiHome, HiUserGroup, HiClipboardList, HiCog, HiLogout, HiX } from 'react-icons/hi';

const Sidebar = ({ onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();
    
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HiHome },
        { name: 'Leads', href: '/dashboard/leads', icon: HiUserGroup },
        { name: 'Follow-ups', href: '/dashboard/follow-ups', icon: HiClipboardList },
        { name: 'Settings', href: '/dashboard/settings', icon: HiCog },
    ];
    
    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    const handleSignOut = () => {
        logout();
    };

    return (
        <div className="h-full bg-slate-900 w-64 text-white flex flex-col fixed left-0 top-0 bottom-0 shadow-2xl border-r border-slate-800">
            <div className="h-16 flex items-center justify-between px-6 bg-slate-900 border-b border-slate-800">
                <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2 tracking-wide hover:text-indigo-400 transition-colors">
                   TrackCRM
                </Link>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                >
                    <HiX className="h-6 w-6" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={onClose}
                            className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 mb-1 ${
                                isActive(item.href)
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <item.icon
                                className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors ${
                                    isActive(item.href) ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'
                                }`}
                            />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

             <div className="p-4 bg-slate-900 border-t border-slate-800">
                <button 
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <HiLogout className="mr-3 h-6 w-6 text-slate-500" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;