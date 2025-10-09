"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import SignupFormDemo from "@/components/signup";
import Navbar from "@/components/navbar1";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <Navbar />
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
          <div className="flex flex-col items-center gap-4">
            <DotLottieReact
              src="https://lottie.host/184e3f2e-31ad-4bfd-9ea2-5bc8650cf1c9/dBlK14bVkG.lottie"
              loop
              autoplay
            />
            <p className="text-white text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      
      <div className={`relative z-30 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {!isLoading && <SignupFormDemo />}
      </div>
    </div>
  );
}
