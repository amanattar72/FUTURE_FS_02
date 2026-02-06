import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                <div className="flex space-x-6 md:order-2">
                    <a href="#" className="text-gray-400 hover:text-gray-500"><FaFacebook className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500"><FaTwitter className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500"><FaLinkedin className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500"><FaInstagram className="h-6 w-6" /></a>
                </div>
                <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                    &copy; 2026 TrackCRM. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;