"use client";

import React from "react";
import Link from "next/link";
import { Compass, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-gray-300 border-t border-[#d4af37]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-[#d4af37]" />
              <span className="font-serif text-xl font-bold tracking-wide text-white">
                Vista<span className="text-[#d4af37]">Pakistan</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Discover Pakistan's hidden gems, from deep valleys and emerald lakes to rich culture, heritage cities, and warm hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold font-serif text-base mb-4 tracking-wider uppercase">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#d4af37] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-[#d4af37] transition-colors duration-200">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-[#d4af37] transition-colors duration-200">
                  Itinerary Planner
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4af37] transition-colors duration-200">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold font-serif text-base mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#d4af37] shrink-0" />
                <span>Sector H-9, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#d4af37] shrink-0" />
                <span>+92 (51) 111-VISTA-PK</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#d4af37] shrink-0" />
                <span>support@vistapakistan.ai</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold font-serif text-base mb-4 tracking-wider uppercase">Stay Updated</h3>
            <p className="text-sm text-gray-400">Subscribe to receive exclusive travel tips and seasonal promotions.</p>
            <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-emerald-900 border border-[#d4af37]/30 text-white rounded-full px-4 py-2 text-xs w-full focus:outline-none focus:border-[#d4af37] placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#d4af37] hover:bg-[#c29e2e] text-[#0f5132] font-bold text-xs px-4 py-2 rounded-full transition-transform hover:scale-105"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#d4af37]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} VistaPakistan Portal. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-3 w-3 text-red-500 mx-1 fill-red-500" /> in Pakistan for AI Course Project
          </p>
        </div>
      </div>
    </footer>
  );
}
