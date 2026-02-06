import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiUserAdd } from 'react-icons/hi';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen flex flex-row-reverse bg-slate-50">
             {/* Visual Side */}
             <div className="hidden lg:flex lg:w-1/2 bg-indigo-700 relative overflow-hidden items-center justify-center">
                <div className="relative z-10 text-center px-10">
                     <div className="mb-8">
                        <span className="text-8xl">🚀</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-6">Join the Revolution</h1>
                    <p className="text-xl text-indigo-100 max-w-md mx-auto leading-relaxed">
                        Start managing your leads with style. Create an account today and get full access.
                    </p>
                </div>
                 {/* Decorative Circles */}
                 <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-indigo-600 blur-3xl opacity-50"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-fuchsia-600 blur-3xl opacity-30"></div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-center">
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                         {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all text-slate-900 bg-white"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                             <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all text-slate-900 bg-white"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                             <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all text-slate-900 bg-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transform transition hover:scale-[1.01] duration-200"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <HiUserAdd className="h-5 w-5 text-indigo-200 group-hover:text-white transition-colors" aria-hidden="true" />
                                </span>
                                Get Started
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;