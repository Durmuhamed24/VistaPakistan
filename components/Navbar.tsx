"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Itinerary Planner", href: "/planner" },
    { name: "About Project", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f5132]/90 backdrop-blur-md border-b border-[#d4af37]/20 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Compass className="h-8 w-8 text-[#d4af37] group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-white">
              Vista<span className="text-[#d4af37]">Pakistan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#d4af37] ${
                    isActive ? "text-[#d4af37] border-b-2 border-[#d4af37] pb-1" : "text-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/planner"
              className="bg-[#d4af37] hover:bg-[#c29e2e] text-[#0f5132] font-semibold text-xs px-4 py-2 rounded-full transition-transform duration-200 hover:scale-105 shadow-md flex items-center space-x-1"
            >
              <Globe className="h-3 w-3" />
              <span>Plan Your Trip</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d4af37] focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f5132] border-b border-[#d4af37]/20 shadow-inner px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive ? "bg-[#d4af37]/10 text-[#d4af37]" : "text-white hover:bg-emerald-950 hover:text-[#d4af37]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 px-3">
            <Link
              href="/planner"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#d4af37] hover:bg-[#c29e2e] text-[#0f5132] font-bold py-2 px-4 rounded-full flex justify-center items-center space-x-2 shadow-md"
            >
              <Globe className="h-4 w-4" />
              <span>Plan Your Trip</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
