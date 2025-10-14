"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          About AsHelp
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          AsHelp is your one-stop platform for seamless assignment and
          presentation assistance. We deliver verified, plagiarism-free, and
          AI-free solutions with a professional touch — designed for students
          and professionals who value quality and authenticity.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              y: -8,
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(168, 85, 247, 0.3)",
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 150,
            }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 shadow-lg text-center cursor-pointer transition-all"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="inline-block"
            >
              <feature.icon className="text-4xl text-purple-400 mx-auto mb-4 group-hover:text-pink-400 transition-colors duration-300" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-20 max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to empower learners and professionals through authentic
          and high-quality academic support. With a secure system, interactive
          forms, and expert guidance, AsHelp makes it easier to focus on what
          matters most — learning and creativity.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-pink-500/30 transition-all"
        >
          Get Started →
        </a>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 border border-purple-400/60 rounded-full text-lg font-semibold text-purple-300 hover:bg-purple-500/10 hover:text-white transition-all"
        >
          <FaHome className="text-purple-400" />
          Go to Home
        </motion.a>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 w-full border-t border-white/10 pt-6 pb-4 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} AsHelp. All rights reserved.</p>
        <p className="mt-1">Designed with ❤️ by the AsHelp Team</p>
      </footer>
    </section>
  );
};

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
    desc: "A clean, responsive UI that adapts to every device perfectly.",
  },
];

export default About;
