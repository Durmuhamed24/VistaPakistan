"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Compass, RotateCcw, ShieldAlert, Star } from "lucide-react";
import { DESTINATIONS, Destination } from "@/lib/destinations-data";

function DestinationsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(DESTINATIONS);

  // Initialize search query from URL parameter if present
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Handle Filtering & Searching
  useEffect(() => {
    let result = DESTINATIONS;

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (dest) =>
          dest.title.toLowerCase().includes(q) ||
          dest.region.toLowerCase().includes(q) ||
          dest.category.toLowerCase().includes(q) ||
          dest.description.toLowerCase().includes(q)
      );
    }

    // 2. Region Filter
    if (selectedRegion !== "All") {
      result = result.filter((dest) => dest.region === selectedRegion);
    }

    // 3. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((dest) => dest.category.includes(selectedCategory));
    }

    setFilteredDestinations(result);
  }, [searchQuery, selectedRegion, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All");
    setSelectedCategory("All");
  };

  const regions = ["All", "North", "Central", "South"];
  const categories = ["All", "Nature", "Adventure", "History", "Culture"];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#0f5132] uppercase tracking-widest block">
            Explore Pakistan Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-emerald-950">
            Discover Your Next Destination
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Filter by region, select activity categories, or search directly for specific wonders. Discover your ideal travel landscape.
          </p>
        </div>

        {/* Filters Widget Panel */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-1 relative">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[#0f5132]" />
              <input
                type="text"
                placeholder="Search destination, region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-emerald-50/50 border border-emerald-950/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Region Selectors */}
            <div className="md:col-span-2 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-2">Region:</span>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedRegion === reg
                      ? "bg-[#0f5132] text-white shadow-md"
                      : "bg-stone-100 hover:bg-stone-200 text-gray-600"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 items-center border-t border-gray-100 pt-4">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all duration-150 ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-[#0f5132] shadow-sm"
                    : "bg-emerald-50/40 border border-emerald-950/5 hover:bg-stone-100 text-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}

            {(searchQuery || selectedRegion !== "All" || selectedCategory !== "All") && (
              <button
                onClick={resetFilters}
                className="ml-auto text-[10px] text-red-600 hover:text-red-800 font-bold flex items-center space-x-1 uppercase tracking-wider"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl overflow-hidden border border-emerald-950/5 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-56 overflow-hidden bg-zinc-100">
                  <img
                    src={
                      dest.id === "hunza-valley"
                        ? "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=600"
                        : dest.id === "swat-valley"
                        ? "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600"
                        : dest.id === "skardu"
                        ? "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600"
                        : dest.id === "lahore-walled-city"
                        ? "https://images.unsplash.com/photo-1602497677028-c1724cd5cfbe?q=80&w=600"
                        : dest.id === "hingol-national-park"
                        ? "https://images.unsplash.com/photo-1616447814421-4f114c00acbd?q=80&w=600"
                        : "https://images.unsplash.com/photo-1569429597321-df621a60183b?q=80&w=600"
                    }
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f5132] text-[#d4af37] text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                    {dest.region}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/40 text-white backdrop-blur-sm text-[9px] font-medium px-2.5 py-1 rounded-full flex items-center space-x-1 border border-white/20">
                    <MapPin className="h-3 w-3 text-[#d4af37]" />
                    <span>{dest.category}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-lg font-bold text-emerald-950 group-hover:text-[#0f5132] transition-colors">
                        {dest.title}
                      </h3>
                      <div className="flex items-center space-x-0.5 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        <span className="text-[10px] font-bold text-gray-700">4.9</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-gray-100 pt-4 mt-auto">
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-500">
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-wider">Best Season</span>
                        <span className="text-gray-700 font-medium truncate block">{dest.best_time.split(" (")[0]}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 font-bold uppercase tracking-wider">Difficulty</span>
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
        ) : (
          /* Empty State */
          <div className="bg-white text-center py-16 px-4 rounded-2xl border border-emerald-950/5 shadow-md max-w-md mx-auto space-y-4">
            <div className="inline-flex p-4 bg-red-50 rounded-full text-red-500">
              <ShieldAlert className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-950">No Destinations Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              We couldn't find any travel wonders matching "{searchQuery}". Try selecting another region or modifying your query.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#0f5132] hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md inline-flex items-center space-x-1.5 transition-transform hover:scale-102"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear Search Criteria</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Destinations() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Compass className="h-10 w-10 text-[#0f5132] animate-spin-slow" />
          <span className="text-xs text-gray-500 font-medium">Loading Destinations...</span>
        </div>
      </div>
    }>
      <DestinationsContent />
    </Suspense>
  );
}
