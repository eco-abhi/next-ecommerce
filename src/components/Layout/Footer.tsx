import React from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 px-6 lg:px-16 text-gray-800 z-10">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 text-center sm:text-left lg:grid-cols-4 lg:text-left gap-8">

                {/* About Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">About</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:link link-underline link-underline-black">About Us</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Press</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Reviews</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Our Stores</a></li>
                    </ul>
                </div>

                {/* Community Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Community</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:link link-underline link-underline-black">Rewards</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Blog</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Trade & Hospitality</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Corporate Gifting</a></li>
                    </ul>
                </div>

                {/* Need Help Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Need Help?</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:link link-underline link-underline-black">Text An Expert</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">FAQ</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Returns & Exchanges</a></li>
                        <li><a href="#" className="hover:link link-underline link-underline-black">Care Guide</a></li>
                    </ul>
                </div>

                {/* Get on the List Section */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Get on the List</h3>
                    <p className="text-sm mb-4">Sign up to know when we launch new products.</p>
                    <form className="flex items-center">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border border-gray-400 rounded-l-lg"
                        />
                        <button className="p-2 bg-gray-800 text-white rounded-r-lg">→</button>
                    </form>
                    <p className="text-xs mt-2">
                        Please keep me up to date with news and offers. I can unsubscribe at any time. I have read the{' '}
                        <a href="#" className="link link-underline link-underline-black">Privacy Policy</a>.
                    </p>
                </div>
            </div>

            {/* Footer Bottom Links */}
            <div className="max-w-screen-xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between text-sm">
                <div className="flex space-x-4 mb-4 sm:mb-0">
                    <a href="#" className="underline">Terms of Service</a>
                    <a href="#" className="underline">Privacy Policy</a>
                    <a href="#" className="underline">Accessibility</a>
                </div>
                <div className="text-sm">© 2024 My Home Theory</div>
                <div className="flex space-x-4 text-lg mt-4 sm:mt-0">
                    <a href="#" className="hover:text-gray-600"><FaFacebookF /></a>
                    <a href="#" className="hover:text-gray-600"><FaPinterestP /></a>
                    <a href="#" className="hover:text-gray-600"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
