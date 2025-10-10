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
      {/* Loading Screen */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      
      <div className={`relative z-30`}>
        {<SignupFormDemo />}
      </div>
    </div>
  );
}
