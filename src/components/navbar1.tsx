"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseclient";
import type { User } from '@supabase/supabase-js';
import Link from "next/link";
import { Search, X, Github, Menu } from 'lucide-react';

interface NavbarDemoProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function NavbarDemo({ searchQuery = "", setSearchQuery }: NavbarDemoProps) {
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Only show navbar if NOT on homepage or landing page
  const shouldShowNavbar = pathname !== '/' && pathname !== '/home';

  // Only show search on dashboard page
  const showSearch = pathname === '/dashboard' && setSearchQuery;

  useEffect(() => {
    if (!supabase) return;
    
    const getUser = async () => {
      const { data: { user } } = await supabase!.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase!.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const clearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery("");
    }
  };

  // Don't render navbar on homepage
  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Glassmorphism Background - Matching navbar1.tsx */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-white text-2xl font-bold">
              Logo
            </Link>
          </div>
      <div className="relative max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="AsHelp Logo" 
              width={24} 
              height={24}
              className="rounded-md"
            />
            <span className="text-white text-2xl font-bold">AsHelp</span>
          </Link>
        </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-base font-medium text-white/90">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar - Only on Dashboard */}
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 bg-white/5 backdrop-blur-md border border-white/10 
                             rounded-full text-white placeholder-white/50 
                             focus:outline-none focus:border-white/30 focus:bg-white/10
                             transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
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
            )}

            {/* GitHub Stars */}
            <a
              href="https://github.com/kris70lesgo/s1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Star</span>
            </a>

            {/* Login Button */}
            {user === null && (
              <button
                onClick={() => router.push('/sign')}
                className="bg-white/10 backdrop-blur-sm text-white text-sm font-semibold py-3 px-6 
                           rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {showSearch && (
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="text-white/90 hover:text-white transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && showSearch && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white/5 backdrop-blur-sm border border-white/10 
                           rounded-lg text-white placeholder-white/50 
                           focus:outline-none focus:border-white/30 focus:bg-white/10
                           transition-all"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 pt-4 pb-6 space-y-3">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user === null && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/sign');
                }}
                className="block w-full px-4 py-3 rounded-lg text-base font-semibold text-white bg-white/10 
                           backdrop-blur-sm border border-white/20 text-center mt-4"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}