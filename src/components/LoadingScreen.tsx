"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "@/components/Backgrounds/Aurora";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

interface LoadingScreenProps {
  isVisible: boolean;
  loadingMessages?: string[];
  variant?: "default" | "minimal" | "branded";
  customDuration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isVisible,
  loadingMessages = [
    "Loading your workspace...",
    "Preparing your experience...",
    "Almost there...",
  ],
  variant = "default",
  customDuration = 3000,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center loading-screen"
        >
          {/* Aurora Background */}
          <div className="absolute inset-0 aurora-background">
            <Aurora
              colorStops={
                variant === "minimal"
                  ? ["#1e293b", "#334155", "#475569"]
                  : ["#3A29FF", "#FF94B4", "#FF3232"]
              }
              blend={variant === "minimal" ? 0.3 : 0.6}
              amplitude={variant === "minimal" ? 0.8 : 1.2}
              speed={variant === "minimal" ? 0.3 : 0.7}
            />
          </div>

          {/* Overlay for better text readability */}
          <div
            className={`absolute inset-0 ${
              variant === "minimal"
                ? "bg-slate-900/60 backdrop-blur-sm"
                : "bg-slate-900/40 backdrop-blur-sm"
            }`}
          />

          {/* Loading Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{
              delay: 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom smooth easing
            }}
            className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-2xl mx-auto text-center loading-content"
          >
            {/* Three-dot dancing animation - Fixed Position */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-center"
            >
              <div
                className={`flex items-end ${
                  variant === "minimal" ? "gap-1" : "gap-2"
                }`}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`bg-white rounded-full ${
                      variant === "minimal" ? "w-3 h-3" : "w-4 h-4"
                    }`}
                    animate={{
                      y: [0, -12, 0], // Dancing up and down motion
                      scale: [1, 1.1, 1], // Slight scale for emphasis
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15, // Staggered timing for wave effect
                      ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier easing
                      repeatType: "loop",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Brand Title - Separate from dots */}
            {variant !== "minimal" && (
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`font-bold text-white ${
                  variant === "branded"
                    ? "text-4xl md:text-5xl"
                    : "text-3xl md:text-4xl"
                }`}
              ></motion.h1>
            )}

            {/* Dynamic Loading Messages - Fixed Width Container */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-center gap-2 w-full max-w-md"
            >
              <div className="w-full flex justify-center">
                <ContainerTextFlip
                  words={loadingMessages}
                  interval={1200}
                  animationDuration={600} // Smoother text transitions
                  className={`text-white/90 font-medium bg-transparent shadow-none border-none ${
                    variant === "minimal"
                      ? "text-base md:text-lg"
                      : "text-lg md:text-xl"
                  } [background:transparent] dark:[background:transparent] shadow-[none] dark:shadow-[none]`}
                />
              </div>
            </motion.div>

            {/* Additional branding elements for branded variant */}
            {/*{variant === "branded" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-white/70 text-sm">
                  Academic Assignment Platform
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-1 h-1 bg-white/50 rounded-full" />
                  <p className="text-white/50 text-xs">
                    Connecting students with verified experts
                  </p>
                  <div className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
              </motion.div>
            )} */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
