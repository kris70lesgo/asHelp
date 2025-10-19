'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>
      <div className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-white text-2xl font-bold">
            Logo
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-12 text-base font-medium text-white/90">
          <Link href="#" className="hover:text-white transition-colors duration-200 relative">
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Home</span>
          </Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Services</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Portfolio</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Contact</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
            <Link
                href="/sign"
                className="bg-white/10 backdrop-blur-sm text-white text-sm font-semibold py-3 px-6 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
                Sign in
            </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
            <div className="px-6 pt-4 pb-6 space-y-3">
                <Link href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Home</Link>
                <Link href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Services</Link>
                <Link href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Portfolio</Link>
                <Link href="#" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Contact</Link>
                <Link href="/sign" className="block px-4 py-3 rounded-lg text-base font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 text-center mt-4">Sign in</Link>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
