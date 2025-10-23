import React from 'react';
import { Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">asHelp</h3>
            <p className="text-gray-400">
              Get professional assignment writing services from verified experts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Assignment Writing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Term Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Presentations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} asHelp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;