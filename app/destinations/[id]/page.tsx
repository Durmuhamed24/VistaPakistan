"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, MapPin, Calendar, Compass, 
  Car, ShieldCheck, Mail, Send, CheckCircle2 
} from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations-data";

export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Retrieve destination from local database
  const dest = DESTINATIONS.find((d) => d.id === id);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", date: "", guests: "1", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!dest) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <ShieldCheck className="h-16 w-16 text-red-500" />
        <h1 className="font-serif text-3xl font-bold text-emerald-950">Destination Not Found</h1>
        <p className="text-sm text-gray-500 max-w-sm">
          We couldn't find a travel package matching ID "{id}". It may have been relocated.
        </p>
        <Link
          href="/destinations"
          className="bg-[#0f5132] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-800"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Find related destinations (same region, excluding current)
  const related = DESTINATIONS.filter((d) => d.region === dest.region && d.id !== dest.id).slice(0, 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", date: "", guests: "1", message: "" });
    }, 1200);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 81, 50, 0.2), rgba(15, 81, 50, 0.85)), url(${
              dest.id === "hunza-valley"
                ? "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=1200"
                : dest.id === "swat-valley"
                ? "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200"
                : dest.id === "skardu"
                ? "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200"
                : dest.id === "lahore-walled-city"
                ? "https://images.unsplash.com/photo-1602497677028-c1724cd5cfbe?q=80&w=1200"
                : dest.id === "hingol-national-park"
                ? "https://images.unsplash.com/photo-1616447814421-4f114c00acbd?q=80&w=1200"
                : "https://images.unsplash.com/photo-1569429597321-df621a60183b?q=80&w=1200"
            })`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 text-white z-10 space-y-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-1.5 bg-black/35 hover:bg-black/50 border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go Back</span>
          </button>
          
          <div className="space-y-1">
            <span className="text-[10px] bg-[#d4af37] text-[#0f5132] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md inline-block">
              {dest.region} Region
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {dest.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Content Layout Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Detail Panel */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Summary Grid */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1 text-center border-r border-gray-100">
                <MapPin className="h-5 w-5 text-[#d4af37] mx-auto" />
                <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Category</span>
                <span className="text-xs text-gray-700 font-semibold truncate block">{dest.category.split(" & ")[0]}</span>
              </div>
              <div className="space-y-1 text-center sm:border-r border-gray-100">
                <Calendar className="h-5 w-5 text-[#d4af37] mx-auto" />
                <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Best Season</span>
                <span className="text-xs text-gray-700 font-semibold truncate block">{dest.best_time.split(" (")[0]}</span>
              </div>
              <div className="space-y-1 text-center border-r border-gray-100">
                <Car className="h-5 w-5 text-[#d4af37] mx-auto" />
                <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Transit</span>
                <span className="text-xs text-gray-700 font-semibold truncate block">{dest.id.includes("valley") || dest.id === "skardu" ? "Flight/Drive" : "Drive"}</span>
              </div>
              <div className="space-y-1 text-center">
                <Compass className="h-5 w-5 text-[#d4af37] mx-auto" />
                <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">Difficulty</span>
                <span className="text-xs text-gray-700 font-semibold block">{dest.difficulty}</span>
              </div>
            </div>

            {/* In Depth Description */}
            <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 border-b border-gray-100 pb-3">
                Overview & Travel Guide
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                {dest.description}
              </p>
              
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-emerald-950">How to Reach</h3>
                <p className="text-xs text-gray-500 bg-stone-50 border-l-4 border-[#d4af37] p-4 rounded-r-xl leading-relaxed">
                  {dest.how_to_reach}
                </p>
              </div>
            </div>

            {/* Checklist Matrix */}
            <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 border-b border-gray-100 pb-3">
                Must-Visit Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-emerald-50/20 border border-emerald-950/5 rounded-xl p-3">
                    <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0" />
                    <span className="text-xs font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Related recommendations */}
            {related.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-bold text-emerald-950">Recommended in {dest.region} Region</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/destinations/${r.id}`}
                      className="bg-white border border-emerald-950/5 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center space-x-4 group"
                    >
                      <div className="h-16 w-16 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={r.id === "hunza-valley" ? "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=150" : r.id === "swat-valley" ? "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=150" : "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=150"}
                          alt={r.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold text-emerald-950 group-hover:text-[#0f5132] truncate">{r.title}</h4>
                        <span className="text-[10px] text-gray-500 font-medium truncate block">{r.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking / Enquiry Form Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-lg space-y-6">
              <div className="space-y-1 text-center">
                <Mail className="h-6 w-6 text-[#d4af37] mx-auto" />
                <h3 className="font-serif text-lg font-bold text-emerald-950">Plan Your Visit</h3>
                <p className="text-[10px] text-gray-400">Send an inquiry and plan with our local travel guides.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-500/20 p-6 rounded-xl text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-serif text-sm font-bold text-emerald-950">Inquiry Sent Successfully</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Thank you! Our tourism coordinator will contact you at your email soon with customized rates and plans.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#0f5132] text-white text-[10px] font-bold px-4 py-2 rounded-lg"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ali Ahmed"
                      className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ali@gmail.com"
                      className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Departure Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Guests</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Special Requests</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your tour preferences..."
                      className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0f5132] hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Booking Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
