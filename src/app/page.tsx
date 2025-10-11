"use client";
import React, { useState, useEffect, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Button2 from '@/components/button2';
import { User, FileText, UploadCloud, CreditCard, Github } from 'lucide-react';
import Upload from '@/components/upload';
import Aurora from '@/components/Backgrounds/Aurora';
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import TailwindConnectButton from "@/components/button";
import { useRouter } from "next/navigation";
import TestimonialMarquee from "@/components/mwrap";
import { NavbarDemo } from "@/components/nav";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimatePresence, motion } from "framer-motion";
import HomePageSkeleton from "@/components/skeletons/homePageSkeleton";

export default function BackgroundBoxesDemo() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [mounted]);

  const mainContentOpacity = scrollY > 100 ? 0 : 1;
  const mainContentTransform = scrollY > 100 ? 'translateY(-50px)' : 'translateY(0)';

  if (!mounted) return null;

  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Loading Skeleton */}
      <AnimatePresence>
        {isLoading && <HomePageSkeleton />}
      </AnimatePresence>

      <motion.div 
        className={cn("transition-opacity duration-700 ease-in-out", isLoading ? 'opacity-0' : 'opacity-100')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <NavbarDemo />

        {/* Aurora Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Hero Section */}
        <div 
          ref={heroRef}
          className="fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500 ease-in-out px-4"
          style={{
            opacity: mainContentOpacity,
            transform: mainContentTransform
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 max-w-3xl mx-auto text-center">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-black font-normal text-sm shadow-sm border border-gray-200 hover:bg-gray-200 transition-all mb-2">
              <User size={18}/> Discover Genuine Solutions
            </button>

            <div className="flex flex-row flex-wrap items-center justify-center gap-1 w-full">
              <h1 className="text-2xl xs:text-4xl sm:text-6xl md:text-7xl font-sans text-white font-semibold whitespace-nowrap">
                Want help in
              </h1>
              <ContainerTextFlip
                words={["Projects", "Assignments", "Termwork", "PPT"]}
                className="text-lg xs:text-xl sm:text-2xl md:text-4xl ml-1 whitespace-nowrap text-gradient"
              />
            </div>

            <div className="mt-2 text-gray-400 text-xs sm:text-lg max-w-xl">
              Get professional assignment writing services from verified experts. 100% AI-free, plagiarism-free content.
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 sm:mt-8 w-full px-4">
            <TailwindConnectButton />
          </div>
        </div>

        {/* Spacer */}
        <div className="h-screen"></div>

        {/* Scroll Container */}
        <div className={`relative z-10`}>
          <ContainerScroll
            titleComponent={
              <h2 className="text-4xl font-semibold text-black dark:text-white">
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none"></span>
              </h2>
            }
          >
            <img
              src={`/linear.webp`}
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
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 text-center">Just 3 steps to get started</h2>
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-5xl mx-auto w-full justify-center items-start">
            {[{
              icon: UploadCloud,
              title: "Upload Your Data",
              description: "Simply upload your data to our secure platform. We support various file formats and data types."
            }, {
              icon: FileText,
              title: "Click Start",
              description: "Our AI algorithms automatically process and analyze your data, extracting valuable insights."
            }, {
              icon: CreditCard,
              title: "Get Actionable Insights",
              description: "Receive clear insights and recommendations based on AI analysis to improve your strategy."
            }].map((step, idx) => (
              <div key={idx} className="flex flex-row items-start gap-4 w-full md:w-1/3">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0">
                  <step.icon size={36} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <TestimonialMarquee/>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center justify-center py-6 text-center text-xs text-gray-400">
          <div className="mt-1">Copyright &copy; {new Date().getFullYear()} asshelp All rights reserved.</div>
        </footer>
      </motion.div>
    </div>
  );
}
