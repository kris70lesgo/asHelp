'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { GitHubStarsButton } from '@/components/animate-ui/buttons/github-stars';
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseclient";
import type { User } from '@supabase/supabase-js';
import Link from "next/link";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "AI Generator",
      link: "/ai-generator",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const Navbar = ({ searchQuery = "", setSearchQuery }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const clearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery("");
    }
  };

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
  useEffect(() => {
    if (!supabase) return;
    
    const getUser = async () => {
      const { data: { user } } = await supabase!.auth.getUser();
      setUser(user);
    };
    getUser();
    // Listen for auth state changes
    const { data: listener } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center justify-center flex-1">
            <NavItems items={navItems} />
          </div>
          <div className="flex items-center gap-4">
            <GitHubStarsButton username="kris70lesgo" repo="s1" />
            {user === null && (
              <NavbarButton variant="secondary" onClick={() => router.push('/sign')}>Login</NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-base font-medium text-white/90">
          <Link href="/" className="hover:text-white transition-colors duration-200 relative">
            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Home</span>
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors duration-200">Services</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Portfolio</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Contact</Link>

          {/* SEARCH BAR - Desktop */}
          {setSearchQuery && (
            <div className="relative ml-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 
                             rounded-full text-white placeholder-white/50 
                             focus:outline-none focus:border-blue-400 focus:ring-2 
                             focus:ring-blue-400/50 transition-all"
                />
                
                {/* Search Icon */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                
                {/* Clear Button */}
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
                               text-white/50 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Toggle for Mobile (if needed) */}
          {setSearchQuery && (
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden text-white/90 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <Link
            href="/sign"
            className="bg-white/10 backdrop-blur-sm text-white text-sm font-semibold py-3 px-6 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mobile Search Toggle */}
          {setSearchQuery && (
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-white/90 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white"
            aria-label="Toggle menu"
          >
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (appears below navbar when toggled) */}
      {showSearch && setSearchQuery && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10 px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 
                         rounded-full text-white placeholder-white/50 
                         focus:outline-none focus:border-blue-400 focus:ring-2 
                         focus:ring-blue-400/50 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-white/50 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-black dark:text-black"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              {user === null && (
                <NavbarButton
                  onClick={() => { setIsMobileMenuOpen(false); router.push('/sign'); }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
     

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 pt-4 pb-6 space-y-3">
            <Link href="/" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Home</Link>
            <Link href="/dashboard" className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors">Services</Link>
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
export const NavbarDemo = Navbar;