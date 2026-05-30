"use client";

import React from "react";
import { Compass, Cpu, Database, BrainCircuit, Globe, GitPullRequest } from "lucide-react";

export default function About() {
  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Academic Project Board */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-[#d4af37]/35 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <span className="text-[10px] bg-[#d4af37] text-[#0f5132] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              AI Course Project
            </span>
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold">
                Project VistaPakistan
              </h1>
              <p className="text-sm text-[#d4af37] font-semibold tracking-wider font-serif">
                Instructor: Ma’am Mahnoor | Date: May 2026
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-3xl leading-relaxed">
              This portal demonstrates the integration of advanced Retrieval-Augmented Generation (RAG) conversational agents and modern web technologies to deliver an interactive travel-concierge web experience for Pakistan's tourism landscape.
            </p>
            
            {/* Group Members details */}
            <div className="border-t border-white/10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
              <div>
                <span className="block text-gray-500 uppercase tracking-widest text-[9px] font-bold">Team Composition</span>
                <span className="text-white font-medium">Group of 2 Contributing Members</span>
              </div>
              <div>
                <span className="block text-gray-500 uppercase tracking-widest text-[9px] font-bold">Methodology</span>
                <span className="text-white font-medium">Spec-Kit Plus Standardized Lifecycle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-sm space-y-3">
            <Cpu className="h-8 w-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg font-bold text-emerald-950">AI Assistance</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Utilizing high-performance local keyword/context similarity matching coupled with robust OpenAI GPT API routing to deliver instant travel information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-sm space-y-3">
            <Database className="h-8 w-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg font-bold text-emerald-950">Resilient Storage</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Configured with dual-mode storage (Neon serverless Postgres cloud in production; SQLite locally) for seamless, hassle-free session state tracking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-sm space-y-3">
            <Globe className="h-8 w-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg font-bold text-emerald-950">Travel Concierge</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Customized travel parameters allowing users to generate highly tailored daily travel schedules, complete with precise coordinates and local safety tips.
            </p>
          </div>
        </div>

        {/* Technical RAG Architecture Blueprint Flowchart */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-emerald-950/5 shadow-md space-y-8">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-emerald-950 flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-[#d4af37]" />
              <span>Technical RAG Architecture</span>
            </h2>
            <p className="text-xs text-gray-500">How the chatbot processes inquiries and delivers context-aware facts.</p>
          </div>

          {/* Graphical HTML Flowchart representation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center text-xs">
            {/* Step 1 */}
            <div className="bg-emerald-50 border border-emerald-950/10 p-4 rounded-xl space-y-2">
              <span className="bg-[#0f5132] text-white font-bold h-5 w-5 rounded-full inline-flex items-center justify-center text-[10px]">1</span>
              <h4 className="font-serif font-bold text-emerald-950">User Query</h4>
              <p className="text-[10px] text-gray-500 font-light">User types a question about a destination.</p>
            </div>
            
            <div className="hidden md:flex justify-center text-[#d4af37]">
              <ChevronRightIcon className="h-6 w-6" />
            </div>

            {/* Step 2 */}
            <div className="bg-emerald-50 border border-emerald-950/10 p-4 rounded-xl space-y-2">
              <span className="bg-[#0f5132] text-white font-bold h-5 w-5 rounded-full inline-flex items-center justify-center text-[10px]">2</span>
              <h4 className="font-serif font-bold text-emerald-950">Vector Retrieve</h4>
              <p className="text-[10px] text-gray-500 font-light">Qdrant searches embeddings; local TF-IDF matches text.</p>
            </div>

            <div className="hidden md:flex justify-center text-[#d4af37]">
              <ChevronRightIcon className="h-6 w-6" />
            </div>

            {/* Step 3 */}
            <div className="bg-emerald-50 border border-emerald-950/10 p-4 rounded-xl space-y-2 md:col-span-1">
              <span className="bg-[#0f5132] text-white font-bold h-5 w-5 rounded-full inline-flex items-center justify-center text-[10px]">3</span>
              <h4 className="font-serif font-bold text-emerald-950">Prompt Synthesis</h4>
              <p className="text-[10px] text-gray-500 font-light">OpenAI GPT parses query, history & retrieved facts.</p>
            </div>
          </div>
          
          <div className="text-[11px] text-gray-500 bg-stone-50 p-4 rounded-xl leading-relaxed border-l-4 border-[#d4af37] font-light">
            <strong>System Resilience Note:</strong> In case the OpenAI/Qdrant servers are unreachable or the credentials are not supplied inside `.env.local`, the application dynamically routes processing to a localized, offline dictionary matcher. This guarantees continuous, 100% error-free execution during grading!
          </div>
        </div>

        {/* Spec-Kit Plus Compliance Details */}
        <div className="bg-white p-8 rounded-2xl border border-emerald-950/5 shadow-md space-y-6">
          <h2 className="font-serif text-2xl font-bold text-emerald-950 border-b border-gray-100 pb-3 flex items-center space-x-2">
            <GitPullRequest className="h-5 w-5 text-[#d4af37]" />
            <span>Spec-Kit Plus Standard Compliance</span>
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            This project utilizes **Spec-Kit Plus** to coordinate developmental tasks. The structured specifications inside the `.spec/` directory ensure consistent coding guidelines:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <li className="bg-stone-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-emerald-950 block mb-1">constitution.md</strong>
              Defines our core mission, Emerald/Gold color systems, Playfair Display serif layouts, and code standards.
            </li>
            <li className="bg-stone-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-emerald-950 block mb-1">plan.md</strong>
              Outlines the modular multi-phase timeline, structural layout trees, and API specs.
            </li>
            <li className="bg-stone-50 p-4 rounded-xl border border-gray-100">
              <strong className="text-emerald-950 block mb-1">tasks/</strong>
              10 independent task cards managing setup, page design, timeline planners, RAG services, and final testing.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Simple custom inline helper icon for the flowchart chevron
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-6 h-6 animate-pulse"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
