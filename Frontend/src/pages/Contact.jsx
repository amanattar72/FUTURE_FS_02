import MainLayout from '../components/layout/MainLayout';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { useState } from 'react';
import api from '../services/api.js';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            // Assuming we have a public endpoint or just creating a lead for now
            await api.post('/leads', { 
                name: formData.name, 
                email: formData.email, 
                source: 'Website',
                notes: [{ text: formData.message, author: 'Contact Form', date: new Date() }] 
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error'); // For demo purposes, we might want to just show success or mock it
             // If API fails (e.g. backend not running), let's just show success to the user for the UI demo
             // setStatus('success'); 
             // STICKING TO TRUTH:
             // setStatus('error');
        }
    };

    return (
        <MainLayout>
            <div className="bg-slate-50 min-h-screen py-12 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Contact Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Get in touch properly
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden shadow-2xl rounded-3xl">
                        {/* Contact Info Side */}
                        <div className="bg-indigo-700 p-10 sm:p-12 relative overflow-hidden">
                             <div className="absolute inset-0 bg-indigo-600 opacity-50 pattern-dots"></div>
                             {/* Decorative circles */}
                             <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-indigo-500/30 blur-2xl"></div>
                             <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-2xl"></div>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-extrabold text-white">Let's Talk</h3>
                                <p className="mt-6 text-indigo-100 text-lg">
                                    Ready to transform your business? We're here to help. Reach out to us and experience the difference.
                                </p>
                                
                                <dl className="mt-12 space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <HiPhone className="h-7 w-7 text-indigo-200" />
                                        </div>
                                        <div className="ml-4">
                                            <dt className="text-lg font-medium text-white">Phone</dt>
                                            <dd className="mt-1 text-indigo-100">+1 (555) 123-4567</dd>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <HiMail className="h-7 w-7 text-indigo-200" />
                                        </div>
                                        <div className="ml-4">
                                            <dt className="text-lg font-medium text-white">Email</dt>
                                            <dd className="mt-1 text-indigo-100">hello@engagehub.com</dd>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <HiLocationMarker className="h-7 w-7 text-indigo-200" />
                                        </div>
                                        <div className="ml-4">
                                            <dt className="text-lg font-medium text-white">Office</dt>
                                            <dd className="mt-1 text-indigo-100">123 Innovation Dr, Tech City</dd>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Contact Form Side */}
                        <div className="bg-white p-10 sm:p-12">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 bg-white"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                
                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400"
                                    >
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                
                                {status === 'success' && (
                                    <div className="rounded-md bg-green-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <HiCheck className="h-5 w-5 text-green-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-green-800">Message sent successfully!</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="rounded-md bg-red-50 p-4">
                                         <div className="flex">
                                             <div className="ml-3">
                                                 <p className="text-sm font-medium text-red-800">Failed to send message. Please try again.</p>
                                             </div>
                                         </div>
                                     </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Contact;