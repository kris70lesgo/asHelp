// components/skeletons/DashboardPageSkeleton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

const Skeleton = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => (
  <motion.div
    className={cn("rounded-md bg-slate-800", className)}
    initial={{ opacity: 0.85 }}
    animate={{ opacity: [0.85, 1, 0.85] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    {...props}
  />
);

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

const HeroSkeleton = () => (
  <section className="relative py-20 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
    <Skeleton className="h-10 sm:h-14 w-3/4 mb-6" />
    <div className="flex flex-col items-center gap-2 w-full max-w-2xl mb-10">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Skeleton className="w-40 h-14 rounded-xl" />
      <Skeleton className="w-40 h-14 rounded-xl" />
    </div>
    <div className="mt-6 text-center">
      <ContainerTextFlip
        words={["Fetching Data...", "Crunching Numbers...", "Almost There..."]}
        className="text-lg sm:text-xl md:text-2xl text-white font-semibold"
      />
    </div>
  </section>
);

const StatsCardSkeleton = () => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 w-full h-36 flex flex-col justify-center items-center">
    <Skeleton className="h-10 w-20 mb-4" />
    <Skeleton className="h-5 w-16" />
  </div>
);

const CardsSkeleton = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <StatsCardSkeleton />
    <StatsCardSkeleton />
    <StatsCardSkeleton />
    <StatsCardSkeleton />
  </section>
);

export default function DashboardPageSkeleton() {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NavbarSkeleton />
      <div className="pt-20 overflow-y-auto h-full">
        <HeroSkeleton />
        <CardsSkeleton />
      </div>
    </motion.div>
  );
}
