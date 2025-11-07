"use client";
import React, { useState, useRef } from 'react';
import { Star, Clock, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NavbarDemo } from "@/components/nav";
import { AnimatePresence } from "framer-motion";
import AcademicHubSkeleton from "@/components/skeletons/dashboardPageSkeleton";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import Image from 'next/image';

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
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.4), transparent 40%)`,
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Core projects without duplicates
  const coreProjects = [
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
      tags: ["handwritten", "plagiarism-free", "on-time", "assignments"],
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
      tags: ["expert-guidance", "plagiarism-free", "termwork"],
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
      tags: ["professional", "custom-design", "presentations", "ppt"],
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
      tags: ["ai", "generator", "free", "instant"],
    },
  ];

  // Combine with mock projects (starting from id 5 to avoid duplicates)
  const allProjects = [
    ...coreProjects,
    ...MOCK_PROJECTS.map((project, index) => ({
      id: index + 5,
      title: project.title,
      category: project.category,
      level: project.level,
      rating: project.rating,
      reviews: project.reviews,
      duration: project.deliveryTime,
      price: project.price,
      originalPrice: project.price * 2,
      tag: project.badge || "Available",
      tagColor: 
        project.badge === "Best Seller" ? "bg-amber-500" : 
        project.badge === "New" ? "bg-emerald-500" : 
        project.badge === "Popular" ? "bg-blue-500" : "bg-gray-500",
      tags: project.tags,
    }))
  ];

  const filteredProjects = allProjects.filter((project) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.level.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const stats = [
    { number: "0%", label: "Plagiarism" },
    { number: "5K+", label: "Projects Delivered" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categories = ["Assignments", "Projects", "Presentations", "Termwork"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto">
      <AnimatePresence>{isLoading && <AcademicHubSkeleton />}</AnimatePresence>

      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <NavbarDemo searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Hero Section with Gradient Background extending from top */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden pt-32">
          {/* Gradient Background - extends to cover navbar area */}
          <div className="absolute inset-0 -top-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Premium Academic{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get high-quality assignments, projects, and research papers crafted by experts. Boost your academic performance with our premium collection.
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

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
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

            {searchQuery && (
              <div className="mb-6">
                <p className="text-slate-300 text-lg">
                  Showing <span className="font-bold text-blue-400">{filteredProjects.length}</span> results for{" "}
                  <span className="font-bold text-purple-400">"{searchQuery}"</span>
                </p>
              </div>
            )}

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <MagicCard
                    key={project.id}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 ${project.tagColor} text-white text-sm font-medium rounded-full`}>
                        {project.tag}
                      </span>
                    </div>

                    <div className="w-full aspect-square bg-slate-700/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      {project.id === 1 && <Image src="/img1.png" alt="Assignment" width={400} height={400} className="w-full h-full object-contain rounded-xl" />}
                      {project.id === 2 && <Image src="/img2.png" alt="Termwork" width={400} height={400} className="w-full h-full object-contain rounded-xl" />}
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
                      {project.id > 4 && (
                        <div className="w-full h-full bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-xl flex items-center justify-center">
                          <div className="text-4xl">📄</div>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">{project.category}</span>
                        <span className="px-2 py-1 bg-slate-700/50 rounded text-xs">{project.level}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
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
                          <span className="text-2xl font-bold text-green-400">FREE</span>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-white">₹{project.price}</span>
                            <span className="text-sm text-slate-400 line-through">₹{project.originalPrice}</span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (project.id === 1) router.push("/form?noOfPage=10&totalAmount=100");
                          else if (project.id === 2) router.push("/form?noOfPage=24&totalAmount=250");
                          else if (project.id === 3) router.push("/form?noOfPage=8&totalAmount=50");
                          else if (project.id === 4) router.push("/ai-generator");
                          else router.push(`/form?totalAmount=${project.price}`);
                        }}
                        className="relative flex items-center gap-3 py-2 text-white uppercase tracking-[0.15em] bg-transparent border-0 cursor-pointer group"
                      >
                        <span>{project.id === 4 ? "Try Now" : "Shop Now"}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
                        </svg>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                      </button>
                    </div>
                  </MagicCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No results found for "{searchQuery}"</h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">Try different keywords or browse all projects</p>
                <button onClick={() => setSearchQuery("")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
                  Clear Search & View All Projects
                </button>
              </div>
            )}
          </div>
        </section>

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

        <footer className="bg-slate-900/80 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Asshelp</span>
                </div>
                <p className="text-slate-400 max-w-md">Your trusted partner for academic excellence. Get premium assignments and projects delivered on time.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <a key={category} href="#" className="block text-slate-400 hover:text-white transition-colors">{category}</a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors">Contact Us</a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors">FAQ</a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors">Live Chat</a>
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