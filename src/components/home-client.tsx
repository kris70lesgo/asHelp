"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FileText, UploadCloud, CreditCard } from 'lucide-react';

// Lazy client components to reduce initial bundle
const NavbarDemo = dynamic(() => import('./nav').then(m => m.NavbarDemo), { loading: () => <div className="h-16" /> });
const Aurora = dynamic(() => import('./Backgrounds/Aurora'), { loading: () => <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-800" /> });
const ContainerTextFlip = dynamic(() => import('./ui/container-text-flip').then(m => m.ContainerTextFlip), { loading: () => <span className="text-white">Projects</span> });
const ContainerScroll = dynamic(() => import('./ui/container-scroll-animation').then(m => m.ContainerScroll), { loading: () => <div className="mx-auto max-w-5xl h-[30rem] md:h-[40rem] rounded-2xl bg-slate-800/40" /> });
const TailwindConnectButton = dynamic(() => import('./button'), { loading: () => (<a className="inline-flex items-center justify-center rounded-md bg-white/10 px-6 py-3 text-white ring-1 ring-white/20">Get Started</a>) });
const TestimonialMarquee = dynamic(() => import('./mwrap'), { loading: () => null });

export default function HomeClient() {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <div className="fixed inset-0 -z-10">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={0.9} />
      </div>

      <NavbarDemo />

      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 md:pt-28 text-center">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-black font-normal text-sm shadow-sm border border-gray-200 hover:bg-gray-200 transition-all mb-4">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-black"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Discover Genuine Solutions
        </button>

        <div className="flex flex-row flex-wrap items-center justify-center gap-1 w-full">
          <h1 className="text-2xl xs:text-4xl sm:text-6xl md:text-7xl font-sans text-white font-semibold whitespace-nowrap">
            Want help in
          </h1>
          <ContainerTextFlip words={["Projects", "assignments", "Termwork", "PPT"]} className="text-lg xs:text-xl sm:text-2xl md:text-4xl ml-1 whitespace-nowrap" />
        </div>
        <p className="mt-2 text-gray-300 text-sm sm:text-lg max-w-xl">Get professional assignment writing services from verified experts. 100% AI-free, plagiarism-free content.</p>
        <div className="mt-6 sm:mt-8"><TailwindConnectButton /></div>
      </section>

      <div className="relative z-10 mt-24">
        <ContainerScroll titleComponent={<h2 className="text-4xl font-semibold text-black dark:text-white" />}>
          <Image src="/homepage.png" alt="hero" height={720} width={1400} className="mx-auto rounded-2xl object-cover h-full object-left-top" draggable={false} priority={false} />
        </ContainerScroll>
      </div>

      <section className="relative z-10 flex flex-col items-center justify-center w-full py-16 bg-transparent">
        <div className="mb-2 text-center text-sm font-mono text-red-500 tracking-widest">HOW IT WORKS</div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 text-center">Just 3 steps to get started</h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-5xl mx-auto w-full justify-center items-start">
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0"><UploadCloud size={36} /></span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">1. Upload Your Data</h3>
              <p className="text-gray-300 text-base">Simply upload your data to our secure platform. We support various file formats and data types to ensure a seamless integration with your existing systems.</p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0"><FileText size={36} /></span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">2. Click Start</h3>
              <p className="text-gray-300 text-base">Our advanced AI algorithms automatically process and analyze your data, extracting valuable insights and patterns that would be difficult to identify manually.</p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-4 w-full md:w-1/3">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 text-3xl shrink-0"><CreditCard size={36} /></span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">3. Get Actionable Insights</h3>
              <p className="text-gray-300 text-base">Receive clear, actionable insights and recommendations based on the AI analysis. Use these insights to make data-driven decisions and improve your business strategies.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialMarquee />

      <footer className="w-full flex flex-col items-center justify-center py-6 text-center text-xs text-gray-400"><div className="mt-1">Copyright &copy; {new Date().getFullYear()} asshelp All rights reserved.</div></footer>
    </div>
  );
}
