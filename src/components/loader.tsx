// components/Loader.tsx
import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const circle = {
  hidden: { scale: 0.85, opacity: 0.35 },
  visible: { scale: 1.15, opacity: 1 },
};

export default memo(function Loader() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, ease: "easeInOut" },
    },
  };

  if (reduce) {
    return (
      <div className="flex items-center justify-center gap-3 p-2" aria-busy="true">
        <div className="w-3 h-3 rounded-full bg-slate-300/90" />
        <div className="w-3 h-3 rounded-full bg-slate-300/70" />
        <div className="w-3 h-3 rounded-full bg-slate-300/50" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="flex items-center justify-center gap-4 p-2"
        initial="hidden"
        animate="visible"
        // variants={container}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        aria-live="polite"
        aria-busy="true"
      >
        <motion.div
          className="w-6 h-6 rounded-full border-2 border-slate-300/90 flex items-center justify-center"
          variants={circle}
          transition={{ duration: 1.2 }}
          style={{ boxSizing: "border-box" }}
        >
          <motion.span
            className="block w-3 h-3 rounded-full bg-slate-300/90"
            animate={{ scale: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="w-6 h-6 rounded-full border-2 border-slate-300/80 flex items-center justify-center"
          variants={circle}
          transition={{ duration: 1.2 }}
        >
          <motion.span
            className="block w-3 h-3 rounded-full bg-slate-300/80"
            animate={{ scale: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.18 }}
          />
        </motion.div>

        <motion.div
          className="w-6 h-6 rounded-full border-2 border-slate-300/70 flex items-center justify-center"
          variants={circle}
          transition={{ duration: 1.2 }}
        >
          <motion.span
            className="block w-3 h-3 rounded-full bg-slate-300/70"
            animate={{ scale: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.36 }}
          />
        </motion.div>


      </motion.div>

      <motion.p
        className="text-slate-200 text-lg font-semibold tracking-wide"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading<span className="text-slate-400">...</span>
      </motion.p>

    </>
  );
});
