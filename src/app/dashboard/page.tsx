"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Clock, Filter } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NavbarDemo } from "@/components/nav";
import { AnimatePresence } from "framer-motion";
import AcademicHubSkeleton from "@/components/skeletons/dashboardPageSkeleton";

// Magic Card Component (from main)
const MagicCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{ position: "relative" }}
    >
      {/* Border highlight effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.4), transparent 40%)`,
            maskImage:
              "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskImage:
              "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMaskComposite: "xor",
            padding: "1px",
            borderRadius: "inherit",
          }}
        />
      )}
      {/* Inner glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

const AcademicHub = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const featuredProjects = [
    {
      id: 1,
      title: "Assignment-Med",
      category: "Assignments",
      level: "Advanced",
      rating: 4.9,
      reviews: 5,
      duration: "5 days",
      price: 100,
      originalPrice: 200,
      tag: "Best Seller",
      tagColor: "bg-amber-500",
    },
    {
      id: 2,
      title: "Termwork-Med",
      category: "Termwork",
      level: "Expert",
      rating: 4.8,
      reviews: 15,
      duration: "2-3 weeks",
      price: 250,
      originalPrice: 400,
      tag: "New",
      tagColor: "bg-emerald-500",
    },
    {
      id: 3,
      title: "PPTs",
      category: "Presentations",
      level: "Intermediate",
      rating: 4.7,
      reviews: 8,
      duration: "3-4 days",
      price: 50,
      originalPrice: 100,
      tag: "Popular",
      tagColor: "bg-blue-500",
    },
    {
      id: 4,
      title: "AI Generator",
      category: "AI-Powered",
      level: "All Levels",
      rating: 4.9,
      reviews: 12,
      duration: "Instant",
      price: 0,
      originalPrice: 0,
      tag: "Free",
      tagColor: "bg-green-500",
    },
  ];

  const stats = [
    { number: "0%", label: "Plagiarism" },
    { number: "5K+", label: "Projects Delivered" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ];

  const categories = ["Assignments", "Projects", "Presentations", "Termwork"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto">
      {/* Loading Screen (from your branch) */}
      <AnimatePresence>{isLoading && <AcademicHubSkeleton />}</AnimatePresence>

      <div
        className={
          isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
        }
      >
        {/* Navbar */}
        <NavbarDemo />

        {/* Hero Section (single) */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Premium Academic{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get high-quality assignments, projects, and research papers
              crafted by experts. Boost your academic performance with our
              premium collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Browse Projects
              </button>
              <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 rounded-xl font-semibold transition-all">
                View Samples
              </button>
            </div>
          </div>
        </section>

        {/* Featured Projects (MagicCard + your Shop Now button) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
              <h2 className="text-3xl font-bold mb-4 sm:mb-0">Featured Projects</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-all">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-all">
                  View All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <MagicCard
                  key={project.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 ${project.tagColor} text-white text-sm font-medium rounded-full`}
                    >
                      {project.tag}
                    </span>
                  </div>

                  <div className="w-full aspect-square bg-slate-700/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    {project.id === 1 && (
                      <Image
                        src="/img1.png"
                        alt="Assignment"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    )}
                    {project.id === 2 && (
                      <Image
                        src="/img2.png"
                        alt="Termwork"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    )}
                    {project.id === 3 && (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center">
                        <div className="text-4xl">📊</div>
                      </div>
                    )}
                    {project.id === 4 && (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                        <div className="text-4xl">🤖</div>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">
                        {project.category}
                      </span>
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">
                        {project.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{project.rating}</span>
                      <span>({project.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.id === 4 ? (
                        <span className="text-2xl font-bold text-green-400">
                          FREE
                        </span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-white">
                            ₹{project.price}
                          </span>
                          <span className="text-sm text-slate-400 line-through">
                            ₹{project.originalPrice}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Your new minimal button */}
                    <button
                      onClick={() => {
                        if (project.id === 1) {
                          router.push("/form?noOfPage=10&totalAmount=100");
                        } else if (project.id === 2) {
                          router.push("/form?noOfPage=24&totalAmount=250");
                        } else if (project.id === 3) {
                          router.push("/form?noOfPage=8&totalAmount=50");
                        } else if (project.id === 4) {
                          router.push("/ai-generator");
                        }
                      }}
                      className="relative flex items-center gap-3 py-2 text-white uppercase tracking-[0.15em] bg-transparent border-0 cursor-pointer group"
                    >
                      <span>{project.id === 4 ? "Try Now" : "Shop Now"}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                        />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </button>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/80 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Asshelp
                  </span>
                </div>
                <p className="text-slate-400 max-w-md">
                  Your trusted partner for academic excellence. Get premium
                  assignments and projects delivered on time.
                </p>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="block text-slate-400 hover:text-white transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Support
                </h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                  <a
                    href="#"
                    className="block text-slate-400 hover:text-white transition-colors"
                  >
                    Live Chat
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2025 Asshelp. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AcademicHub;
