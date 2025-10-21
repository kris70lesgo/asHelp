"use client";
import React, { useState, useEffect } from "react";
import { Star, Clock, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavbarDemo } from "@/components/nav";
import { AnimatePresence } from "framer-motion";
import AcademicHubSkeleton from "@/components/skeletons/dashboardPageSkeleton";
import Image from "next/image";
import styles from "./uiverseButton.module.css"; // Updated for CSS-module integration

const AcademicHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) return null;

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
      <AnimatePresence>{isLoading && <AcademicHubSkeleton />}</AnimatePresence>

      <div
        className={
          isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"
        }
      >
        <NavbarDemo />

        {/* Featured Projects */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
              <h2 className="text-3xl font-bold mb-4 sm:mb-0">
                Featured Projects
              </h2>
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
                <div
                  key={project.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-105"
                >
                  <div className="flex justify-between mb-4">
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
                        className="object-contain"
                      />
                    )}
                    {project.id === 2 && (
                      <Image
                        src="/img2.png"
                        alt="Termwork"
                        width={400}
                        height={400}
                        className="object-contain"
                      />
                    )}
                    {project.id === 4 && (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                        <div className="text-4xl">🤖</div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
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

                    {/* Updated button integrated with CSS module */}
                    <button
                      className={styles.cta}
                      onClick={() => {
                        if (project.id === 1)
                          router.push("/form?noOfPage=10&totalAmount=100");
                        else if (project.id === 2)
                          router.push("/form?noOfPage=24&totalAmount=250");
                        else if (project.id === 3)
                          router.push("/form?noOfPage=8&totalAmount=50");
                        else if (project.id === 4) router.push("/ai-generator");
                      }}
                    >
                      <span className={styles.hoverUnderlineAnimation}>
                        {project.id === 4 ? "Try now" : "Shop now"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="10"
                        viewBox="0 0 46 16"
                      >
                        <path
                          d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                          transform="translate(30)"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcademicHub;
