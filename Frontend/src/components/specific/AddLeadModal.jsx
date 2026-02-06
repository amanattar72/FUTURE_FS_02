import { useState } from 'react';
import { HiX } from 'react-icons/hi';

const AddLeadModal = ({ isOpen, onClose, onLeadAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        source: 'Website',
        status: 'New'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to create lead');

            const newLead = await response.json();
            onLeadAdded(newLead);
            setFormData({ name: '', email: '', source: 'Website', status: 'New' });
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to create lead');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay with animation */}
                <div 
                    className="fixed inset-0 bg-slate-900 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300" 
                    aria-hidden="true" 
                    onClick={onClose}
                ></div>

                {/* Center modal */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="relative z-10 inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8 animate-scale-in">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-indigo-600"></div>
                    
                    <div className="absolute top-0 right-0 pt-5 pr-5">
                        <button
                            type="button"
                            className="bg-slate-100 rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <HiX className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <div className="mb-6">
                                <h3 className="text-2xl leading-6 font-bold text-slate-900 mb-2" id="modal-title">
                                    Add New Lead
                                </h3>
                                <p className="text-sm text-slate-500">Fill in the details to create a new lead in your CRM.</p>
                            </div>
                            
                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                                            <p className="text-sm text-red-700 font-medium">{error}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="source" className="block text-sm font-semibold text-slate-700 mb-2">
                                                Source
                                            </label>
                                            <select
                                                id="source"
                                                name="source"
                                                value={formData.source}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400 bg-white"
                                            >
                                                <option>Website</option>
                                                <option>Referral</option>
                                                <option>LinkedIn</option>
                                                <option>Twitter</option>
                                                <option>Facebook</option>
                                                <option>Email Campaign</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 hover:border-slate-400 bg-white"
                                            >
                                                <option>New</option>
                                                <option>Contacted</option>
                                                <option>Converted</option>
                                                <option>Lost</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-8 sm:mt-8 flex flex-col-reverse sm:flex-row sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mt-3 sm:mt-0 w-full inline-flex justify-center items-center rounded-lg border-2 border-slate-300 shadow-sm px-6 py-3 bg-white text-base font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transition-all duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-lg px-6 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-base font-bold text-white hover:from-indigo-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating...
                                                </>
                                            ) : (
                                                'Create Lead'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddLeadModal;