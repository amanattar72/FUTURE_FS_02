import { useState } from 'react';
import { HiCamera, HiUser, HiLockClosed, HiCheckCircle } from 'react-icons/hi';

const Profile = () => {
    const [photo, setPhoto] = useState(localStorage.getItem('userPhoto') || '');
    const [name, setName] = useState(localStorage.getItem('userName') || '');
    const [email] = useState(localStorage.getItem('userEmail') || 'user@example.com');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'File size must be less than 2MB!' });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPhoto(base64String);
                localStorage.setItem('userPhoto', base64String);
                setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameUpdate = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setMessage({ type: 'error', text: 'Name cannot be empty!' });
            return;
        }
        localStorage.setItem('userName', name);
        setMessage({ type: 'success', text: 'Name updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
            return;
        }
        // In a real app, you'd call an API here
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h2>
                <p className="text-slate-600">Manage your account settings and preferences</p>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded-xl border-l-4 animate-slide-up ${message.type === 'success' ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-500'}`}>
                    <div className="flex items-center">
                        {message.type === 'success' && <HiCheckCircle className="h-5 w-5 text-emerald-500 mr-2" />}
                        <p className={`text-sm font-medium ${message.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>{message.text}</p>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {/* Profile Photo */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                            <HiCamera className="h-6 w-6 text-indigo-600" />
                        </div>
                        Profile Photo
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
                        <div className="relative group">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt="Profile"
                                    className="h-32 w-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg group-hover:border-indigo-200 transition-all duration-300"
                                />
                            ) : (
                                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-4xl border-4 border-indigo-100 shadow-lg">
                                    {name.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <HiCamera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105">
                                <HiCamera className="mr-2 h-5 w-5" />
                                Upload Photo
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                            <p className="mt-3 text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                            <p className="mt-1 text-xs text-slate-400">Recommended: Square image, at least 400x400px</p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                            <HiUser className="h-6 w-6 text-indigo-600" />
                        </div>
                        Personal Information
                    </h3>
                    <form onSubmit={handleNameUpdate} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    disabled
                                    className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-slate-50 text-slate-500 sm:text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                            <HiLockClosed className="h-6 w-6 text-indigo-600" />
                        </div>
                        Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-5">
                        <div>
                            <label htmlFor="current-password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-semibold text-slate-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;