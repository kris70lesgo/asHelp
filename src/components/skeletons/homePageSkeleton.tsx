// components/HomePageSkeleton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A reusable skeleton component with a pulsing animation.
 */
// I've seen a few different typings for your Skeleton component. 
// React.ComponentProps<typeof motion.div> is the most robust.
const Skeleton = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => (
  <motion.div
    className={cn("rounded-md bg-slate-800", className)}
    initial={{ opacity: 0.85 }} // Opacity increased
    animate={{ opacity: [0.85, 1, 0.85] }} // Opacity increased
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    {...props}
  />
);

/**
 * Skeleton placeholder for the Navbar.
 */
const NavbarSkeleton = () => (
  <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 bg-slate-900/80 backdrop-blur-sm">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      {/* Logo Placeholder */}
      <Skeleton className="w-24 h-6" />
      {/* Nav Links & Button Placeholder */}
      <div className="hidden md:flex items-center gap-4">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-28 h-9 rounded-md" />
      </div>
      {/* Mobile Menu Placeholder */}
      <div className="md:hidden">
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
    </div>
  </header>
);

/**
 * Skeleton placeholder for the main Hero section.
 */
const HeroSkeleton = () => (
  <div className="flex flex-col items-center justify-center gap-4 px-4 max-w-3xl mx-auto text-center">
    {/* Pill Button Placeholder */}
    <Skeleton className="h-7 w-48 rounded-full mb-2" />
    
    {/* Heading Placeholders */}
    <div className="flex flex-col items-center gap-2 w-full">
      <Skeleton className="h-12 sm:h-16 w-3/4" />
      <Skeleton className="h-8 sm:h-10 w-1/2" />
    </div>

    {/* Description Placeholders */}
    <div className="flex flex-col items-center gap-2 w-full max-w-xl mt-2">
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-5/6" />
    </div>
   
    {/* Main CTA Button Placeholder */}
    <Skeleton className="h-12 w-56 mt-6 rounded-lg" />
  </div>
);


/**
 * The main skeleton loader for the home page.
 * It combines the Navbar and Hero skeletons to mimic the page layout.
 */
export default function HomePageSkeleton() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fades out smoothly on exit
      transition={{ duration: 0.4 }}
    >
      <NavbarSkeleton />
      <div className="w-full flex items-center justify-center">
        <HeroSkeleton />
      </div>
    </motion.div>
  );
}