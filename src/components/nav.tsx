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
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

export function NavbarDemo() {
  const { t } = useTranslations();
  const navItems = [
    {
      name: t('navigation.features', 'Features'),
      link: "",
    },
    {
      name: "AI Generator",
      link: "/ai-generator",
    },
    {
      name: "About",
      link: "",
    },
    {
      name: t('navigation.contact', 'Contact'),
      link: "",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
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
          <NavItems items={navItems} />
          <div className="flex items-center gap-3 ml-6">
            <LanguageSwitcher className="shrink-0" />
            <div className="hidden sm:block">
              <GitHubStarsButton username="kris70lesgo" repo="s1" />
            </div>
            {user === null && (
              <NavbarButton variant="secondary" onClick={() => router.push('/sign')}>
                {t('navigation.signIn', 'Login')}
              </NavbarButton>
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-black dark:text-black"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              {user === null && (
                <NavbarButton
                  onClick={() => { setIsMobileMenuOpen(false); router.push('/sign'); }}
                  variant="primary"
                  className="w-full"
                >
                  {t('navigation.signIn', 'Login')}
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
