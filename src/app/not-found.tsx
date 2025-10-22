"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Aurora from "@/components/Backgrounds/Aurora";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const messages = [
    "This page took a study break and never came back.",
    "404: The page you're looking for isn't in the syllabus.",
    "You’ve reached a blank page. No notes here.",
    "This page is missing. The experience isn’t.",
    "This page pulled an all-nighter and disappeared.",
    "We couldn’t find that page. Maybe it dropped the course?",
    "404: This page is still in draft mode.",
    "You’ve reached a page that didn’t pass the final.",
    "This page missed the deadline — just like us sometimes.",
    "This page is on a coffee break. Try again later.",
    "You’ve reached a page that’s still figuring things out.",
  ];

  const randomMessage = useMemo(() => {
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  // Mouse tracking for gradient movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth);
      mouseY.set(event.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const spherePositions = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      left: `${Math.floor(Math.random() * 90)}%`,
      delay: i * 1.2,
      duration: 6 + Math.random() * 3,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.4}
        />
      </div>

      {/* 🌧️ Falling spheres */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {spherePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#3A29FF] via-[#FF94B4] to-[#FF3232] opacity-30 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[0_0_25px_white] blinking-shadow"
            style={{ top: -100, left: pos.left }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: [0, 800], opacity: [1, 0] }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay,
            }}
          >
            <motion.span
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* 🧠 Glassy dark 404 Card */}
      <motion.div
        className="relative z-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(139,92,246,0.5),0_0_20px_white] p-10  text-center max-w-xl w-full blinking-shadow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1}}
      >
        {/* 🔠 Bigger swinging 404 */}
        <motion.h1
          className="text-[7rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3A29FF] to-[#FF94B4] mb-6"
          animate={{
            rotate: [-8, 8, -8],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          404
        </motion.h1>

        <p className="text-2xl mb-4 text-gray-300 font-bold  flicker-text">
          {randomMessage}
        </p>

        <p className="text-lg text-gray-400 mb-6">
          Oops! The page you’re looking for cannot be found.
        </p>

        {/* Interactive button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block"
        >
          <Link
            href="/"
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#3A29FF] to-[#FF94B4] text-white font-semibold shadow-lg overflow-hidden"
          >
            <span className="absolute inset-0 bg-white opacity-10 blur-lg"></span>
            <ArrowLeft size={20} /> Go Back Home
          </Link>
        </motion.div>
      </motion.div>

      {/* 🎯 Scoped glitch animation */}
      <style jsx>{`
      @keyframes flicker {
        0%, 100% { opacity: 0.85; filter: brightness(1.15); }
        50% { opacity: 0.85; filter: brightness(0.8); }
      }

      .flicker-text {
        animation: flicker 1.5s infinite;
      }


      `}</style>
    </div>
  );
}