"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Facebook, X, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'AI Generator', href: '/ai-generator' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '/#features' },
    { name: 'Sign Up', href: '/sign' },
  ];

  const helpLinks = [
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact Support', href: '#contact' },
    { name: 'Documentation', href: '#docs' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const supportLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'X', icon: X, href: 'https://x.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="relative w-full bg-slate-900/95 backdrop-blur-sm border-t border-gray-800 z-30">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="https://assets.aceternity.com/logo-dark.png"
                alt="AsHelp Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl sm:text-2xl font-bold text-white">AsHelp</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Get professional assignment writing services from verified experts. 
              100% AI-free, plagiarism-free content delivered on time.
            </p>
            
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-xs">Thank you for subscribing!</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 pl-4 lg:pl-6">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block py-1 hover:translate-x-1 transform relative z-10"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">Help</h3>
            <ul className="space-y-2 sm:space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3 mb-6">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm">Follow Us</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-200 group"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
            <div className="text-gray-400 text-xs sm:text-sm">
              Copyright &copy; {new Date().getFullYear()} AsHelp. All rights reserved.
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Made with ❤ for students worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
