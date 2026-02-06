import MainLayout from '../components/layout/MainLayout';
import { HiCheck, HiSparkles, HiGlobeAlt, HiUserGroup } from 'react-icons/hi';

const About = () => {
    return (
        <MainLayout>
            <div className="bg-white overflow-hidden">
                {/* Hero Section */}
                <div className="relative py-16 sm:py-24 bg-indigo-700">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-0 top-0 w-full h-full bg-indigo-800 opacity-50 pattern-grid"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm">
                            We Are TrackCRM
                        </h2>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100 font-medium">
                            Empowering businesses with creativity and connection. We're not just a CRM; we're your growth partner.
                        </p>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-slate-50 py-16 sm:py-24">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                             <h3 className="text-base font-bold text-indigo-600 uppercase tracking-wide">Our Mission</h3>
                             <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                Why We Do What We Do
                             </p>
                             <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                                 We believe powerful tools should be simple to use, accessible to all, and designed to make work more enjoyable.
                             </p>
                        </div>

                         <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-500 p-8 transform hover:-translate-y-1">
                                <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                                    <HiSparkles className="h-8 w-8 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Simplicity First</h3>
                                <p className="text-slate-600 leading-relaxed">We believe powerful tools don't have to be complicated. Our interface is designed to sparkle.</p>
                            </div>

                             {/* Card 2 */}
                             <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-fuchsia-500 p-8 transform hover:-translate-y-1">
                                <div className="h-14 w-14 rounded-full bg-fuchsia-100 flex items-center justify-center mb-6">
                                    <HiChartBarIcon className="h-8 w-8 text-fuchsia-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Vibrant Analytics</h3>
                                <p className="text-slate-600 leading-relaxed">Data shouldn't be boring. Visualize your success with our colorful and interactive charts.</p>
                            </div>

                             {/* Card 3 */}
                             <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-amber-500 p-8 transform hover:-translate-y-1">
                                <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                                    <HiGlobeAlt className="h-8 w-8 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Growth Focused</h3>
                                <p className="text-slate-600 leading-relaxed">Every feature is built with one goal in mind: helping you grow your revenue and team globally.</p>
                            </div>
                         </div>
                     </div>
                </div>

                {/* Team Stats Section */}
                <div className="bg-indigo-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                                <p className="text-4xl font-extrabold text-white">100+</p>
                                <p className="mt-2 text-indigo-200">Customers</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                                <p className="text-4xl font-extrabold text-white">24/7</p>
                                <p className="mt-2 text-indigo-200">Support</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                                <p className="text-4xl font-extrabold text-white">99%</p>
                                <p className="mt-2 text-indigo-200">Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

// Helper component for the chart icon since I used a name that might not be imported directly above
// Actually I'll just use HiChartBar but I used HiChartBarIcon in the code. Let me fix the import or the usage.
// Standardizing to HiChartBar from react-icons/hi
const HiChartBarIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
);

export default About;