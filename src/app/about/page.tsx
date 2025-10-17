"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaHome,
} from "react-icons/fa";

// SSR-free Sparkle Background
const SparkleMeshBackground = dynamic(
  () => import("../../components/SparkleMeshBackground"),
  { ssr: false }
);

const features = [
  {
    icon: FaCheckCircle,
    title: "Verified Solutions",
    desc: "Every project is reviewed by real experts for originality and quality.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Authentication",
    desc: "Supabase Auth with Google and Email ensures safe user access.",
  },
  {
    icon: FaBolt,
    title: "Fast & Reliable",
    desc: "Built with Next.js 15 and Turbopack for lightning-fast performance.",
  },
  {
    icon: FaUsers,
    title: "User-Centered Design",
    desc: "A sleek, responsive UI that adapts seamlessly to all devices.",
  },
];

const About = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#000000] via-[#0b0b0b] to-[#1a1a1a] text-gray-100 flex flex-col items-center px-6 py-20 relative overflow-hidden">
      {/* Sparkle Background */}
      <SparkleMeshBackground />

      {/* 🏆 Empowering Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center mb-16 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500">
          Empowering Students with Seamless Help
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          At <span className="text-gray-200 font-semibold">AsHelp</span>, we
          make academic and creative work effortless — delivering verified,
          plagiarism-free, and AI-free solutions built on trust and originality.
        </p>
      </motion.div>

      {/* 💡 Feature Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 w-full flex justify-center mb-10"
      >
        <div className="p-6 bg-gradient-to-b from-[#141414]/80 to-[#1e1e1e]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_35px_rgba(255,255,255,0.05)] max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Smart, Secure & Student-First
          </h2>
          <p className="text-gray-400">
            Get your assignments, projects, and presentations done efficiently —
            with privacy, creativity, and deadlines always in check.
          </p>
        </div>
      </motion.div>
      <br />
      <br />
      <br />
      <br />

      {/* Why Choose Section */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Why Choose Us ?
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Unlock reliable, effortless academic assistance powered by real
          experts. We make collaboration simple, transparent, and future-ready.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              y: -6,
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-transparent backdrop-blur-2xl rounded-3xl p-8 text-center shadow-md transition-all duration-300"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="inline-block"
            >
              <feature.icon className="text-4xl text-gray-300 mx-auto mb-4 group-hover:text-white transition-colors duration-300" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
      <br />
      <br />

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-24 max-w-4xl text-center relative z-10"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Our Mission
        </h1>
        <p className="text-gray-400 leading-relaxed">
          Our mission is to empower learners and professionals with accessible,
          authentic academic support. We bridge creativity and credibility —
          helping you focus on learning, innovation, and growth.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-16 flex flex-wrap justify-center gap-4 relative z-10"
      >
        <a
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-[#333333] to-[#555555] rounded-full text-lg font-semibold text-white shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all"
        >
          Get Started →
        </a>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-8 py-3 border border-gray-500/60 rounded-full text-lg font-semibold text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-all"
        >
          <FaHome className="text-gray-400" />
          Go to Home
        </motion.a>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 w-full border-t border-white/10 pt-6 pb-4 text-center text-gray-500 text-sm relative z-10">
        <p>© {new Date().getFullYear()} AsHelp. All rights reserved.</p>
        <p className="mt-1">
          Designed with ❤️ by the <span className="text-gray-300">AsHelp</span>{" "}
          Team
        </p>
      </footer>
    </section>
  );
};

export default About;
