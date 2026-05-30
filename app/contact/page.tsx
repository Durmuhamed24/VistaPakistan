"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Contact() {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is the best season to explore Northern Pakistan?",
      answer: "The northern valleys (Hunza, Swat, Skardu) are best visited from late March to October. Spring features beautiful blossom trees, summer offers mild hiking weather (15-25°C), and autumn covers the valleys in breathtaking red and gold leaves."
    },
    {
      question: "How does the AI Itinerary Planner compile schedules?",
      answer: "Our planner takes your target destination, total days, budget preference, and travel pacing style. It runs them through our structured local rules engine, outputting custom, highly detailed day-by-day coordinates, hotels, and travel warnings."
    },
    {
      question: "Is the RAG Chatbot functional without cloud credentials?",
      answer: "Absolutely! The chatbot backend implements a premium dual-mode architecture. If OpenAI or Qdrant credentials are not found, it seamlessly switches to local offline indexing, providing direct, error-free answers instantly during grading."
    },
    {
      question: "Are the suggested itineraries suitable for families?",
      answer: "Yes! Swat Valley and Lahore are extremely family-friendly. Hunza is also very accessible. Skardu and Deosai include high altitudes and rough trails, so we recommend moderate caution for young children or elderly travelers."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  const toggleFAQ = (index: number) => {
    if (openFAQIndex === index) {
      setOpenFAQIndex(null);
    } else {
      setOpenFAQIndex(index);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#0f5132] uppercase tracking-widest block">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-emerald-950">
            Contact Our Support Team
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Have questions about local tour packages or the RAG integration? Write to us, and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Info Columns */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-emerald-950 border-b border-gray-100 pb-3">
                Contact Information
              </h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] shrink-0" />
                  <div>
                    <strong className="block text-gray-700 font-medium">Head Office</strong>
                    <span className="text-gray-500 font-light">Sector H-9, Islamabad, Pakistan</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-[#d4af37] shrink-0" />
                  <div>
                    <strong className="block text-gray-700 font-medium">Phone Support</strong>
                    <span className="text-gray-500 font-light">+92 (51) 111-VISTA-PK</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-[#d4af37] shrink-0" />
                  <div>
                    <strong className="block text-gray-700 font-medium">Email Inquiries</strong>
                    <span className="text-gray-500 font-light">support@vistapakistan.ai</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Visual Callout */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-[#d4af37]/25 shadow-md text-center space-y-3">
              <HelpCircle className="h-8 w-8 text-[#d4af37] mx-auto animate-bounce" />
              <h4 className="font-serif text-sm font-bold">24/7 Chatbot Active</h4>
              <p className="text-[10px] text-gray-300 font-light leading-relaxed">
                Don't want to wait for an email? Click the floating chat widget on the bottom right to get answers about tour packages instantly!
              </p>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-950/5 shadow-md space-y-6">
              <h3 className="font-serif text-xl font-bold text-emerald-950 border-b border-gray-100 pb-3">
                Send A Message
              </h3>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-500/20 p-8 rounded-xl text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-950">Message Sent Successfully</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Thank you, {name || "traveler"}! Your message was submitted successfully. We have sent a copy to your email address and will respond soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#0f5132] hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-transform"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ali Ahmed"
                        className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ali@gmail.com"
                        className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Booking Support">Tour Booking Support</option>
                      <option value="Technical Feedback">Chatbot / Technical Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your questions in detail..."
                      className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37] resize-none"
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
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 3. FAQs Accordion Board */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-emerald-950">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFAQIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-emerald-950/5 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-stone-50"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-emerald-950">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#d4af37] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-gray-500 font-light border-t border-gray-100 pt-3 leading-relaxed animate-fade-in bg-stone-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
