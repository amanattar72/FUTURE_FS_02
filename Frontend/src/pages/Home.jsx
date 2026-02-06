import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { HiChartBar, HiUserGroup, HiShieldCheck, HiLightningBolt, HiArrowRight } from 'react-icons/hi';

const features = [
  {
    name: 'Lead Tracking',
    description: 'Monitor every interaction and keep track of where your leads are in the pipeline.',
    icon: HiUserGroup,
    color: 'bg-indigo-600',
    iconColor: 'text-white',
  },
  {
    name: 'Real-time Updates',
    description: 'Status updates ensure your team is always on the same page instantly.',
    icon: HiLightningBolt,
    color: 'bg-amber-500',
    iconColor: 'text-white',
  },
  {
    name: 'Detailed Analytics',
    description: 'Gain insights into your sales performance with comprehensive charts.',
    icon: HiChartBar,
    color: 'bg-emerald-500',
    iconColor: 'text-white',
  },
  {
    name: 'Secure Access',
    description: 'Enterprise-grade security to keep your customer data safe and private.',
    icon: HiShieldCheck,
    color: 'bg-purple-600',
    iconColor: 'text-white',
  },
];

const Home = () => {
    return (
        <MainLayout>
            <div className="bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <div className="relative pt-6 pb-16 sm:pb-24 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                                <span className="block">Track Every Lead.</span>
                                <span className="block text-indigo-600">
                                    Accelerate Growth.
                                </span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-slate-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                TrackCRM helps your sales team work smarter, close deals faster, and build strong, lasting customer relationships.
                            </p>
                            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                <div className="rounded-md shadow">
                                    <Link
                                        to="/signup"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105 shadow-md"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                    <Link
                                        to="/about"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105 shadow-sm"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Section */}
                <div className="bg-white py-16 sm:py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base font-semibold tracking-wider text-indigo-600 uppercase">Deploy faster</h2>
                            <p className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                                Everything you need to succeed
                            </p>
                            <p className="mt-5 max-w-2xl mx-auto text-xl text-slate-500">
                                Powerful tools designed to help you manage leads efficiently and effectively.
                            </p>
                        </div>

                        <div className="mt-12">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature) => (
                                    <div key={feature.name} className="pt-6">
                                        <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8 h-full hover:shadow-xl transition-shadow duration-300 border border-slate-100">
                                            <div className="-mt-6">
                                                <div>
                                                    <span className={`inline-flex items-center justify-center p-3 rounded-md shadow-lg ${feature.color}`}>
                                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">{feature.name}</h3>
                                                <p className="mt-5 text-base text-slate-500">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Preview Section */}
                <div className="bg-slate-900 relative overflow-hidden">
                     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100/10"></div>
                     <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                            <div>
                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                    Analytics that matter
                                </h2>
                                <p className="mt-3 max-w-3xl text-lg text-slate-300">
                                    Get real-time insights into your sales pipeline. Understand what's working and what's not with our comprehensive dashboard.
                                </p>
                                <div className="mt-8 sm:flex">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            View Dashboard
                                            <HiArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                                <div className="col-span-1 flex justify-center py-8 px-8 bg-white/10 rounded-xl backdrop-blur-sm">
                                     <HiChartBar className="h-12 w-12 text-indigo-400" />
                                </div>
                                 <div className="col-span-1 flex justify-center py-8 px-8 bg-white/10 rounded-xl backdrop-blur-sm">
                                     <HiUserGroup className="h-12 w-12 text-indigo-400" />
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;