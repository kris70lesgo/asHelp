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
      link: "/contact-form",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

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
     

      {/* Navbar */}
    </div>
  );
}
