"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Compass, MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/destinations");
    }
  };

  // Select Hunza, Swat, and Skardu for the featured section
  const featured = DESTINATIONS.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Visual Asset Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 81, 50, 0.45), rgba(15, 81, 50, 0.85)), url('https://images.unsplash.com/photo-1549880181-56a44cf4a9a1?q=80&w=1200')",
          }}
        />
        
        {/* Content Container */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/45 rounded-full px-4 py-1.5 backdrop-blur-sm animate-fade-in">
            <Compass className="h-4 w-4 text-[#d4af37]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
              The Ultimate Pakistan Travel Portal
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
            Discover the Majestic Wonders of <span className="text-[#d4af37]">Pakistan</span>
          </h1>

          <p className="text-sm sm:text-lg max-w-2xl mx-auto text-gray-200 font-light">
            From towering emerald peaks and ancient Mughal courtyards to high-altitude deserts and rugged coastal roads. Explore your next adventure.
          </p>

          {/* Quick Search Widget */}
          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-full p-2 shadow-2xl flex items-center border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-300"
          >
            <div className="flex items-center space-x-2 pl-4 flex-grow">
              <Search className="h-5 w-5 text-[#0f5132]" />
              <input
                type="text"
                placeholder="Search Hunza, Swat, Skardu, Lahore, Hingol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm text-gray-800 focus:outline-none bg-transparent placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0f5132] hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform hover:scale-102 flex items-center space-x-1.5 shadow-md shrink-0"
            >
              <span>Explore</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. Interactive Statistics Section */}
      <section className="bg-emerald-950 text-white py-12 border-y border-[#d4af37]/20 relative z-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#d4af37]">7,000+</span>
              <p className="text-xs uppercase tracking-wider text-gray-400">Glaciers (Highest Outside Poles)</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#d4af37]">5 Peak</span>
              <p className="text-xs uppercase tracking-wider text-gray-400">Summits Above 8,000m</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#d4af37]">5,000+ Yrs</span>
              <p className="text-xs uppercase tracking-wider text-gray-400">Ancient Heritage & History</p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#d4af37]">100%</span>
              <p className="text-xs uppercase tracking-wider text-gray-400">Warm Pakistani Hospitality</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Destinations */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#0f5132] uppercase tracking-widest block mb-1">
                Top Rated Packages
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950">
                Featured Destinations
              </h2>
            </div>
            <Link 
              href="/destinations"
              className="text-sm font-semibold text-[#0f5132] hover:text-[#d4af37] flex items-center space-x-1 mt-4 md:mt-0 transition-colors"
            >
              <span>View All Destinations</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((dest) => (
              <div 
                key={dest.id}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-950/5 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-64 overflow-hidden bg-zinc-200">
                  <img
                    src={
                      dest.id === "hunza-valley" 
                        ? "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=600"
                        : dest.id === "swat-valley"
                        ? "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600"
                        : "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600"
                    }
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f5132] text-[#d4af37] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                    {dest.region}
                  </div>
                  {/* Glassmorphic Category overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/40 text-white backdrop-blur-sm text-[10px] font-medium px-3 py-1 rounded-full flex items-center space-x-1 border border-white/20">
                    <MapPin className="h-3 w-3 text-[#d4af37]" />
                    <span>{dest.category}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-xl font-bold text-emerald-950 group-hover:text-[#0f5132] transition-colors">
                        {dest.title}
                      </h3>
                      <div className="flex items-center space-x-0.5 text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span className="text-xs font-bold text-gray-700">4.9</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-gray-100 pt-4 mt-auto">
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                      <div>
                        <span className="block text-gray-400 font-semibold uppercase tracking-wider">Best Season</span>
                        <span className="text-gray-700 font-medium truncate block">{dest.best_time.split(" (")[0]}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-semibold uppercase tracking-wider">Difficulty</span>
                        <span className="text-gray-700 font-medium block">{dest.difficulty}</span>
                      </div>
                    </div>

                    <Link
                      href={`/destinations/${dest.id}`}
                      className="w-full text-center bg-emerald-50 hover:bg-[#0f5132] text-[#0f5132] hover:text-white border border-[#0f5132]/10 font-bold text-xs py-2.5 rounded-xl transition-all duration-200 block shadow-inner"
                    >
                      View Details & Guide
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Plan Your Trip CTA */}
      <section className="relative py-24 overflow-hidden bg-[#0f5132] text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1000')",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block">Interactive AI Itinerary Planner</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Create Your Custom Dream Journey Instantly
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto text-gray-200 font-light">
            Select your travel preferences, trip duration, budget tier, and style. Our planner creates a custom, high-fidelity daily travel plan.
          </p>
          <div className="pt-4">
            <Link
              href="/planner"
              className="bg-[#d4af37] hover:bg-[#c29e2e] text-[#0f5132] font-extrabold text-sm px-8 py-3.5 rounded-full transition-transform hover:scale-105 shadow-xl inline-flex items-center space-x-2"
            >
              <span>Build Custom Itinerary</span>
              <Compass className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
