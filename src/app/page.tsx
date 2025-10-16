"use client";
import React, { useState, useEffect } from "react";
import { FileText, UploadCloud, CreditCard } from 'lucide-react';
import Aurora from '@/components/Backgrounds/Aurora';
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import TailwindConnectButton from "@/components/button";
import TestimonialMarquee from "@/components/mwrap"
import { NavbarDemo } from "@/components/nav";
import Image from 'next/image';
import { AnimatePresence } from "framer-motion";
import HomePageSkeleton from "@/components/skeletons/homePageSkeleton";
import Footer from "@/components/footer";



export default function BackgroundBoxesDemo() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Simulate loading time for components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Show loader for 4 seconds to see the animation properly

    return () => clearTimeout(timer);
  }, [mounted]);

  // Hide main content after scrolling 100px
  const mainContentOpacity = scrollY > 100 ? 0 : 1;
  const mainContentTransform = scrollY > 100 ? 'translateY(-50px)' : 'translateY(0)';

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="relative bg-slate-900">
      {/* Loading Screen --- UPDATED SECTION */}
      <AnimatePresence>
        {isLoading && <HomePageSkeleton />}
      </AnimatePresence>

      <NavbarDemo />
      
      {/* Aurora as background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Main content centered - positioned fixed to stay in center */}
      <div 
        className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          opacity: isLoading ? 0 : mainContentOpacity,
          transform: mainContentTransform
        }}
      >
        {/* Hero Section Layout Fix */}
        <div className="flex flex-col items-center justify-center gap-4 px-4 max-w-3xl mx-auto text-center">
          {/* Button Row */}
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-black font-normal text-sm shadow-sm border border-gray-200 hover:bg-gray-200 transition-all mb-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-black"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Discover Genuine Solutions
          </button>
          {/* Heading + Flip Row */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-1 w-full">
            <h1 className="text-2xl xs:text-4xl sm:text-6xl md:text-7xl font-sans text-white font-semibold whitespace-nowrap">
              Want help in
            </h1>
            <ContainerTextFlip
              words={["Projects", "assignments", "Termwork", "PPT"]}
              className="text-lg xs:text-xl sm:text-2xl md:text-4xl ml-1 whitespace-nowrap"
            />
          </div>
          {/* Description Row */}
          <div className="mt-2 text-gray-400 text-xs sm:text-lg max-w-xl">
            Get professional assignment writing services from verified experts. 100% AI-free, plagiarism-free content.
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 sm:mt-8 w-full px-4">
          <TailwindConnectButton />
        </div>
      </div>
      
      {/* Spacer div to replace the br tags */}
      <div className="h-screen"></div>
      
      {/* ContainerScroll in normal document flow for scrolling */}
      <div className={`relative z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-black dark:text-white">
                
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  
                </span>
              </h2>
            </>
          }
        >
          <Image
            src="/hero-image.png"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        
      </div>
      {/* 3 Steps Section */}
      <section className="relative z-20 flex flex-col items-center justify-center w-full py-16 bg-transparent">
        <div className="mb-2 text-center text-sm font-mono text-red-500 tracking-widest">HOW IT WORKS</div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white dark:text-white mb-12 text-center">Just 3 steps to get started</h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-5xl mx-auto w-full justify-center items-start">
          {/* Step 1 */}
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0">
              <UploadCloud size={36} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white dark:text-white mb-1">1. Upload Your Data</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">Simply upload your data to our secure platform. We support various file formats and data types to ensure a seamless integration with your existing systems.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0">
              <FileText size={36} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white dark:text-white mb-1">2. Click Start</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">Our advanced AI algorithms automatically process and analyze your data, extracting valuable insights and patterns that would be difficult to identify manually.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0">
              <CreditCard size={36} />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white dark:text-white mb-1">3. Get Actionable Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 text-base">Receive clear, actionable insights and recommendations based on the AI analysis. Use these insights to make data-driven decisions and improve your business strategies.</p>
            </div>
          </div>
        </div>
      </section>
      {/* End 3 Steps Section */}
      <TestimonialMarquee/>
      <Footer />
    </div>
  );
}