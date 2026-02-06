import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { mockLeads, mockNotes } from '../data/mockData.js';
import { HiArrowLeft, HiPlus, HiMail, HiCalendar } from 'react-icons/hi';

const LeadDetails = () => {
    const { id } = useParams();
    const lead = mockLeads.find(l => l.id === parseInt(id)) || {
        id: 1, name: 'Jane Cooper', email: 'jane@example.com', source: 'Website', lastContact: '2023-01-01', status: 'New'
    };
    const [status, setStatus] = useState(lead?.status || 'New');
    const [notes, setNotes] = useState(mockNotes.filter(n => n.leadId === parseInt(id)));
    const [newNote, setNewNote] = useState('');

    if (!lead) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-900">Lead not found</h2>
                <Link to="/dashboard/leads" className="text-indigo-600 hover:text-indigo-900 mt-4 block font-medium">Back to Leads</Link>
            </div>
        );
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        if(!newNote.trim()) return;
        const note = {
            id: notes.length + 10,
            text: newNote,
            date: new Date().toISOString().split('T')[0],
            leadId: lead.id
        };
        setNotes([note, ...notes]);
        setNewNote('');
    };

    return (
        <div>
            <Link to="/dashboard/leads" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 group transition-colors">
                <HiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Leads
            </Link>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm overflow-hidden sm:rounded-xl border border-slate-100">
                        <div className="px-6 py-5 flex justify-between items-center bg-slate-50/50 border-b border-slate-100">
                             <div>
                                <h3 className="text-base font-semibold leading-6 text-slate-900">Lead Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-slate-500">Personal details and current status.</p>
                             </div>
                             <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block py-2 px-3 border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
                            >
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Converted</option>
                            </select>
                        </div>
                        <div className="px-6 py-5">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-slate-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-slate-900 font-semibold">{lead.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-slate-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-slate-900">{lead.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-slate-500">Source</dt>
                                    <dd className="mt-1 text-sm text-slate-900">{lead.source}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-slate-500">Last Contact</dt>
                                    <dd className="mt-1 text-sm text-slate-900">{lead.lastContact}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="bg-white shadow-sm sm:rounded-xl border border-slate-100">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                             <h3 className="text-base font-semibold leading-6 text-slate-900">Notes & Follow-ups</h3>
                        </div>
                        <div className="px-6 py-5">
                             <form onSubmit={handleAddNote} className="mb-8">
                                 <div>
                                     <label htmlFor="note" className="sr-only">Add a note</label>
                                     <textarea
                                         rows={3}
                                         name="note"
                                         id="note"
                                         className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-slate-300 rounded-lg p-3 text-slate-900 placeholder-slate-400"
                                         placeholder="Add a note or follow-up reminder..."
                                         value={newNote}
                                         onChange={(e) => setNewNote(e.target.value)}
                                     />
                                 </div>
                                 <div className="mt-3 text-right">
                                     <button
                                         type="submit"
                                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all hover:scale-105"
                                     >
                                         <HiPlus className="-ml-1 mr-2 h-5 w-5" />
                                         Add Note
                                     </button>
                                 </div>
                             </form>

                             <ul className="space-y-4">
                                 {notes.length > 0 ? notes.map((note) => (
                                     <li key={note.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-indigo-100 transition-colors">
                                         <div className="flex space-x-3">
                                             <div className="flex-1 space-y-1">
                                                 <div className="flex items-center justify-between">
                                                     <h3 className="text-sm font-bold text-slate-900">Note</h3>
                                                     <p className="text-xs text-slate-500">{note.date}</p>
                                                 </div>
                                                 <p className="text-sm text-slate-600 leading-relaxed">{note.text}</p>
                                             </div>
                                         </div>
                                     </li>
                                 )) : (
                                     <li className="text-center text-slate-400 py-8 italic border-2 border-dashed border-slate-100 rounded-xl">No notes yet. Start typing above to add one!</li>
                                 )}
                             </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-white shadow-sm sm:rounded-xl p-6 border border-slate-100">
                        <h3 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                                <HiMail className="mr-2 h-5 w-5" />
                                Send Email
                            </button>
                             <button className="w-full flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                                <HiCalendar className="mr-2 h-5 w-5 text-slate-500" />
                                Schedule Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;