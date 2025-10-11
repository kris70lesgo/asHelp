"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "./Backgrounds/Aurora";
import { ContainerTextFlip } from "./ui/container-text-flip";

interface LoadingScreenProps {
  isLoading: boolean;
  phrases?: string[];
}

const defaultPhrases = [
  "Loading your dashboard...",
  "Fetching latest insights...",
  "Almost there...",
  "Preparing content..."
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, phrases = defaultPhrases }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Aurora full-screen background */}
          <Aurora className="absolute inset-0" />

          {/* Centered dynamic loading text */}
          <motion.div
            className="relative z-10 text-white text-center text-lg font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <ContainerTextFlip texts={phrases} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
