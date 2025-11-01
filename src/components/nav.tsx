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
import { Search, X } from 'lucide-react';

interface NavbarDemoProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

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

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center justify-center flex-1">
            <NavItems items={navItems} />
          </div>

          {/* Desktop Search Bar */}
          {setSearchQuery && (
            <div className="hidden md:flex items-center mr-4">
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
            </div>
          )}

          <div className="flex items-center gap-4">
            <GitHubStarsButton username="kris70lesgo" repo="s1" />
            {user === null && (
              <NavbarButton variant="secondary" onClick={() => router.push('/sign')}>
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              {setSearchQuery && (
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="text-white/90 hover:text-white transition-colors md:hidden"
                  aria-label="Toggle search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          {/* Mobile Search Bar (appears below header when toggled) */}
          {showMobileSearch && setSearchQuery && (
            <div className="px-4 py-3 border-t border-white/10 md:hidden">
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

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
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
    </div>
  );
}