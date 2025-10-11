// components/skeletons/AcademicHubSkeleton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A reusable skeleton component with a pulsing animation.
 */
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
      <Skeleton className="w-24 h-6" />
      <div className="hidden md:flex items-center gap-4">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-28 h-9 rounded-md" />
      </div>
      <div className="md:hidden">
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
    </div>
  </header>
);

/**
 * Skeleton placeholder for the Hero Section.
 */
const HeroSkeleton = () => (
  <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full">
    <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
      <Skeleton className="h-10 sm:h-14 w-3/4 mb-6" />
      <div className="flex flex-col items-center gap-2 w-full max-w-2xl mb-10">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton className="w-40 h-14 rounded-xl" />
        <Skeleton className="w-40 h-14 rounded-xl" />
      </div>
    </div>
  </section>
);

/**
 * Skeleton placeholder for a single Project Card.
 */
const ProjectCardSkeleton = () => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-start mb-4">
            <Skeleton className="w-24 h-7 rounded-full" />
        </div>
        <Skeleton className="w-full aspect-square rounded-xl mb-4" />
        <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-20 h-5 rounded" />
                <Skeleton className="w-20 h-5 rounded" />
            </div>
            <Skeleton className="w-3/4 h-6 mb-4" />
        </div>
        <Skeleton className="w-1/2 h-5 mb-4" />
        <Skeleton className="w-1/3 h-5 mb-4" />
        <div className="flex items-center justify-between">
            <Skeleton className="w-1/4 h-8" />
            <Skeleton className="w-1/3 h-10 rounded-lg" />
        </div>
    </div>
);

/**
 * Skeleton placeholder for the Featured Projects section.
 */
const FeaturedProjectsSkeleton = () => (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
                <Skeleton className="w-1/3 h-9 mb-4 sm:mb-0" />
                <div className="flex gap-3">
                    <Skeleton className="w-24 h-10 rounded-lg" />
                    <Skeleton className="w-24 h-10 rounded-lg" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
            </div>
        </div>
    </section>
);


/**
 * The main skeleton loader for the Academic Hub page.
 */
export default function AcademicHubSkeleton() {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NavbarSkeleton />
      {/* Add padding-top to account for the fixed navbar */}
      <div className="pt-20 overflow-y-auto h-full">
        <HeroSkeleton />
        <FeaturedProjectsSkeleton />
      </div>
    </motion.div>
  );
}