import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import api from '../services/api.js';
import AddLeadModal from '../components/specific/AddLeadModal';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchLeads = async () => {
        try {
            const res = await api.get('/leads');
            setLeads(res.data);
        } catch (err) {
            console.error("Error fetching leads", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                await api.delete(`/leads/${id}`);
                setLeads(leads.filter(lead => lead._id !== id));
            } catch (err) {
                console.error("Error deleting lead", err);
            }
        }
    };

    const handleLeadAdded = (newLead) => {
        setLeads([newLead, ...leads]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-700/20';
            case 'Contacted': return 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-700/20';
            case 'Converted': return 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
            default: return 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-600/20';
        }
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-slate-500 animate-pulse text-lg">Loading leads...</div>
        </div>
    );

    return (
        <div className="flex flex-col space-y-6 animate-fade-in">
            {/* Search / Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center bg-white p-5 rounded-2xl shadow-lg border border-slate-100">
                <div className="relative rounded-lg shadow-sm w-full sm:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiSearch className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-11 pr-4 py-3 sm:text-sm border-slate-300 rounded-lg transition-all duration-200 hover:border-slate-400"
                        placeholder="Search leads..."
                    />
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                    <HiPlus className="h-5 w-5 mr-2" />
                    Add Lead
                </button>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 rounded-2xl">
                <table className="min-w-full divide-y divide-slate-300">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Source</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Created</th>
                            <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {leads.map((person) => (
                            <tr key={person._id} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-11 w-11">
                                             <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold border-2 border-indigo-100 shadow-md">
                                                {person.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-bold text-slate-900">{person.name}</div>
                                            <div className="text-sm text-slate-500">{person.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(person.status)}`}>
                                        {person.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">{person.source}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(person.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <Link to={`/dashboard/leads/${person._id}`} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2.5 rounded-lg hover:bg-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md">
                                            <HiEye className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(person._id)} className="text-rose-600 hover:text-rose-900 bg-rose-50 p-2.5 rounded-lg hover:bg-rose-100 transition-all duration-200 shadow-sm hover:shadow-md">
                                            <HiTrash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden space-y-4">
                {leads.map((person) => (
                    <div key={person._id} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg border-2 border-indigo-100 shadow-md">
                                    {person.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">{person.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{person.email}</div>
                                </div>
                            </div>
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getStatusColor(person.status)}`}>
                                {person.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pt-3 border-t border-slate-100">
                            <span className="font-medium">{person.source}</span>
                            <span className="text-xs">{new Date(person.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex space-x-2">
                            <Link to={`/dashboard/leads/${person._id}`} className="flex-1 text-center px-4 py-2.5 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm">
                                View Details
                            </Link>
                            <button onClick={() => handleDelete(person._id)} className="flex-1 px-4 py-2.5 text-sm font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors shadow-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AddLeadModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLeadAdded={handleLeadAdded}
            />
        </div>
    );
};

export default Leads;