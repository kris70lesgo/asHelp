"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UsePageTransitionOptions {
  duration?: number;
  messages?: string[];
}

export const usePageTransition = (options: UsePageTransitionOptions = {}) => {
  const { duration = 3000, messages = [] } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [mounted, duration]);

  const triggerTransition = (path: string, transitionMessages?: string[]) => {
    setIsLoading(true);

    // Small delay to show loading state before navigation
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return {
    isLoading,
    mounted,
    triggerTransition,
    setIsLoading,
  };
};

export default usePageTransition;
