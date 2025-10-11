// components/skeletons/SignupPageSkeleton.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// The fixed reusable Skeleton component
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
 * Skeleton placeholder for the Signup Form.
 */
const SignupFormSkeleton = () => (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input"> 
        {/* Title Placeholder */}
        <Skeleton className="h-8 w-1/3 mb-2" />
        {/* Subtitle Placeholder */}
        <Skeleton className="h-4 w-3/4 mb-10" />
        
        {/* Form Fields Placeholders */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
        <Skeleton className="h-10 w-full mb-4 rounded-md" />
        <Skeleton className="h-10 w-full mb-8 rounded-md" />

        {/* Button Placeholder */}
        <Skeleton className="h-10 w-full rounded-md" />
    </div>
);

/**
 * The main skeleton loader for the Signup page.
 */
export default function SignupPageSkeleton() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 p-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SignupFormSkeleton />
    </motion.div>
  );
}