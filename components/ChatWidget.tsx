"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Compass, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Assalam-o-Alaikum! I am your VistaPakistan AI Travel assistant. Ask me anything about destinations, weather, itineraries, or local attractions in Pakistan!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions
  const suggestions = [
    "Tell me about Hunza Valley",
    "What are highlights of Lahore?",
    "When to visit Hingol Park?",
    "How to reach Skardu?"
  ];

  useEffect(() => {
    // Generate/Retrieve Session ID
    let sid = localStorage.getItem("vp_chat_session_id");
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15);
      localStorage.setItem("vp_chat_session_id", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg: Message = {
      sender: "user",
      text: text.trim(),
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Use the built-in Next.js API route (no separate backend needed)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: text,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        sender: "bot",
        text: data.response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.warn("API route unavailable, using client-side fallback.", error);
      // Fallback to client-side responses
      const fallbackText = getClientFallbackResponse(text);
      const botMsg: Message = {
        sender: "bot",
        text: fallbackText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#0f5132]/95 border border-[#d4af37]/30 shadow-2xl rounded-2xl w-[350px] sm:w-[380px] h-[500px] flex flex-col mb-4 overflow-hidden backdrop-blur-md animate-fade-in">
          {/* Header */}
          <div className="bg-emerald-950 p-4 border-b border-[#d4af37]/20 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-[#d4af37] animate-spin-slow" />
              <div>
                <h4 className="text-white font-serif font-bold text-sm">VistaPakistan AI Guide</h4>
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] text-gray-300">Resilient RAG Mode</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Board */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.sender === "user"
                      ? "bg-[#d4af37] text-[#0f5132] font-semibold rounded-tr-none"
                      : "bg-emerald-900/60 border border-[#d4af37]/10 text-gray-200 rounded-tl-none leading-relaxed"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center space-x-1 text-[9px] text-[#d4af37]/80 uppercase tracking-widest mb-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>Concierge</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="text-[8px] text-gray-400 block mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-emerald-900/60 border border-[#d4af37]/10 text-gray-300 rounded-2xl rounded-tl-none px-4 py-3 flex space-x-1 items-center">
                  <span className="h-1.5 w-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 bg-[#d4af37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-emerald-950/40 border-t border-[#d4af37]/10">
              <p className="text-[10px] text-[#d4af37]/75 font-semibold uppercase tracking-wider mb-1.5">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[10px] bg-emerald-900/50 hover:bg-emerald-900 hover:text-white border border-[#d4af37]/20 text-gray-300 rounded-full px-2.5 py-1 text-left transition-all duration-150"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-emerald-950 border-t border-[#d4af37]/20 flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Ask about travel guides..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(inputValue);
              }}
              className="flex-1 bg-emerald-900 text-white rounded-full border border-[#d4af37]/20 px-4 py-2 text-xs focus:outline-none focus:border-[#d4af37] placeholder-gray-400"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="bg-[#d4af37] hover:bg-[#c29e2e] text-[#0f5132] p-2 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0f5132] hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 hover:scale-110 flex items-center justify-center focus:outline-none group relative"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-[#d4af37]" />
        ) : (
          <MessageSquare className="h-6 w-6 text-[#d4af37] group-hover:rotate-6 transition-transform" />
        )}
      </button>
    </div>
  );
}

// Resilient local match dictionary in case the user's backend isn't loaded
function getClientFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("hunza")) {
    return "🏔️ **Hunza Valley (North Pakistan)**\n\n* **Highlights:** Baltit Fort, Altit Fort, Attabad Lake, Passu Cones, Eagle's Nest.\n* **Best Time:** March to October (stunning Spring blossoms and Golden Autumn).\n* **Route:** Fly to Gilgit from Islamabad, then drive 2 hours, or drive the scenic Karakoram Highway.\n* **Difficulty:** Easy to Moderate.";
  }
  if (q.includes("swat")) {
    return "🌲 **Swat Valley (North Pakistan)**\n\n* **Highlights:** Kalam, Malam Jabba Ski Resort, Ushu Pine Forest, Mahodand Lake.\n* **Best Time:** April to October, or winter for snow skiing (Dec-Feb).\n* **Route:** Smooth 3.5 hour drive from Islamabad via the Swat Expressway.\n* **Difficulty:** Easy & family friendly.";
  }
  if (q.includes("skardu")) {
    return "⛰️ **Skardu Valley (North Pakistan)**\n\n* **Highlights:** Deosai National Park (High altitude plateau), Cold Desert of Katpana, Shangrila Resort, Shigar Valley.\n* **Best Time:** June to September.\n* **Route:** 1 hour flight from Islamabad or drive Karakoram Highway.\n* **Difficulty:** Moderate to Hard.";
  }
  if (q.includes("lahore")) {
    return "🕌 **Walled City of Lahore (Central Pakistan)**\n\n* **Highlights:** Badshahi Mosque, Lahore Fort (Shahi Qila), Wazir Khan Mosque, Food Street.\n* **Best Time:** October to March (Cool winters are ideal for walking tours).\n* **Route:** Accessible via M-2 Motorway (4 hours from Islamabad) or Lahore Airport.\n* **Difficulty:** Easy city exploration.";
  }
  if (q.includes("hingol") || q.includes("balochistan")) {
    return "🌵 **Hingol National Park (South Pakistan)**\n\n* **Highlights:** Princess of Hope rock, Sphinx of Balochistan, Kund Malir Beach, Hinglaj Mata mandir.\n* **Best Time:** November to February (Summers exceed 45°C).\n* **Route:** Drive 3.5 hours from Karachi along the Makran Coastal Highway.\n* **Difficulty:** Moderate desert climate exploration.";
  }
  if (q.includes("karachi") || q.includes("clifton")) {
    return "🌊 **Karachi & Clifton Beach (South Pakistan)**\n\n* **Highlights:** Mazar-e-Quaid, Clifton Beach camel rides, Mohatta Palace, Port Grand.\n* **Best Time:** November to February (Cool ocean breeze).\n* **Route:** Direct flight to Jinnah International Airport, Karachi.\n* **Difficulty:** Easy urban tour.";
  }

  // Greeting Fallbacks
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("assalam")) {
    return "Assalam-o-Alaikum! Welcome back. I am connected locally on the browser. I can answer travel questions on Hunza, Swat, Skardu, Lahore, Hingol, and Karachi. Ask me about best times or routes!";
  }

  return "Thank you for asking! I am currently searching the local database. If you start our FastAPI backend on port 8000, I will use advanced RAG embeddings. For now, I can detail: **Hunza**, **Swat**, **Skardu**, **Lahore**, **Hingol**, and **Karachi**. Just ask about any of these!";
}
