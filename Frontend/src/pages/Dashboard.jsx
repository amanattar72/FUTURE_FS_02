import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowSmUp, HiArrowSmDown, HiChartPie, HiCurrencyDollar, HiUserGroup, HiLightningBolt } from 'react-icons/hi';
import api from '../services/api.js';

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentLeads, setRecentLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('revenue')) return HiCurrencyDollar;
        if (t.includes('leads')) return HiUserGroup;
        if (t.includes('rate')) return HiChartPie;
        return HiLightningBolt;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700 ring-1 ring-blue-700/20';
            case 'Contacted': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-700/20';
            case 'Converted': return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-700/20';
            case 'Lost': return 'bg-rose-100 text-rose-700 ring-1 ring-rose-700/20';
            default: return 'bg-slate-100 text-slate-700 ring-1 ring-slate-700/20';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, leadsRes] = await Promise.all([
                    api.get('/dashboard/stats'),
                    api.get('/leads')
                ]);
                setStats(statsRes.data);
                setRecentLeads(leadsRes.data.slice(0, 5));
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="text-slate-500 animate-pulse text-lg">Loading dashboard...</div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((item, index) => {
                    const Icon = getIcon(item.title);
                    return (
                        <div key={item.id} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-1">
                            <div className="p-5 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-0 flex-1">
                                        <dl>
                                            <dt className="text-xs sm:text-sm font-bold text-slate-500 truncate uppercase tracking-wider">{item.title}</dt>
                                            <dd>
                                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{item.value}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div className={`p-3 sm:p-4 rounded-xl shadow-md ${index % 2 === 0 ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white' : 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white'}`}>
                                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 px-5 sm:px-6 py-3 border-t border-slate-100">
                                <div className="text-xs sm:text-sm">
                                    <div className={`font-semibold inline-flex items-center ${item.type === 'increase' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                         {item.type === 'increase' ? <HiArrowSmUp className="self-center flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5" /> : <HiArrowSmDown className="self-center flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5" />}
                                         <span className="ml-1">{item.change}</span>
                                         <span className="text-slate-400 ml-2 font-normal hidden sm:inline">from last month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl leading-6 font-bold text-slate-900">Recent Activity</h3>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                {recentLeads.length > 0 ? (
                    <div className="flow-root">
                        <ul role="list" className="-mb-8">
                            {recentLeads.map((lead, leadIdx) => (
                                <li key={lead._id}>
                                    <div className="relative pb-8">
                                        {leadIdx !== recentLeads.length - 1 ? (
                                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-4 items-start group">
                                            <div>
                                                <span className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center ring-4 ring-white shadow-md text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                                                    {lead.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                <div className="flex-1">
                                                    <p className="text-sm text-slate-600 font-medium">
                                                        New lead:{' '}
                                                        <Link to={`/dashboard/leads/${lead._id}`} className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                                            {lead.name}
                                                        </Link>
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-500">{lead.email}</p>
                                                </div>
                                                <div className="whitespace-nowrap text-right text-sm">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                                                        {lead.status}
                                                    </span>
                                                    <p className="mt-2 text-xs text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Link
                                to="/dashboard/leads"
                                className="w-full flex justify-center items-center px-4 py-3 border-2 border-indigo-200 shadow-sm text-sm font-bold rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
                            >
                                View all leads →
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl h-64 flex items-center justify-center bg-slate-50">
                        <div className="text-center">
                            <HiChartPie className="mx-auto h-16 w-16 text-slate-300" />
                            <p className="mt-4 text-base text-slate-500 font-semibold">No recent activity</p>
                            <p className="text-sm text-slate-400 mt-1">New leads will appear here</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;