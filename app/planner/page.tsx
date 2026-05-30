"use client";

import React, { useState } from "react";
import { Compass, Calendar, Sparkles, MapPin, DollarSign, Plane, ChevronRight, Printer } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations-data";

interface ItineraryDay {
  day: number;
  title: string;
  activity: string;
  location: string;
  coordinate: string;
  tip: string;
}

export default function Planner() {
  // Input States
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0].id);
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState("Standard");
  const [style, setStyle] = useState("Balanced");

  // Output State
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const generated = buildItinerary(selectedDest, duration, budget, style);
      setItinerary(generated);
      setIsGenerating(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedDestinationObj = DESTINATIONS.find((d) => d.id === selectedDest);

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 print:hidden">
          <span className="text-xs font-bold text-[#0f5132] uppercase tracking-widest block">
            AI Journey Planner
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-emerald-950">
            Design Your Personalized Itinerary
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Select your preferences and instantly generate a premium, high-fidelity day-by-day travel planner for your adventure in Pakistan.
          </p>
        </div>

        {/* Form Panel & Output Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-emerald-950/5 shadow-md space-y-6 print:hidden">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Sparkles className="h-5 w-5 text-[#d4af37]" />
              <h3 className="font-serif text-base font-bold text-emerald-950">Travel Options</h3>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              {/* Destination */}
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Destination</label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.title} ({d.region})</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Duration (Days)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDuration(days)}
                      className={`py-2 rounded-lg font-semibold transition-all ${
                        duration === days
                          ? "bg-[#0f5132] text-white"
                          : "bg-stone-50 border border-emerald-950/10 text-gray-600"
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Budget Tier</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Budget">Budget (Backpacker comfort)</option>
                  <option value="Standard">Standard (Comfort & Cozy)</option>
                  <option value="Luxury">Luxury (Premium boutique resort)</option>
                </select>
              </div>

              {/* Travel Style */}
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Travel Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-stone-50 border border-emerald-950/10 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Adventure">Adventure (Hiking & Scenic Peaks)</option>
                  <option value="Balanced">Balanced (Sightseeing & Local Food)</option>
                  <option value="Relaxed">Relaxed (Slow pacing & Scenery)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-[#0f5132] hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md"
              >
                {isGenerating ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-[#d4af37]" />
                    <span>Generate Travel Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Timeline Output Column */}
          <div className="lg:col-span-2">
            {itinerary ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-950/5 shadow-lg space-y-8 animate-fade-in relative">
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="absolute top-6 right-6 p-2 bg-emerald-50 hover:bg-emerald-100 text-[#0f5132] rounded-full shadow-inner transition-all flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider print:hidden"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print Plan</span>
                </button>

                {/* Itinerary Header */}
                <div className="border-b border-gray-100 pb-6 space-y-2">
                  <div className="inline-flex items-center space-x-1.5 text-xs text-[#d4af37] font-bold uppercase tracking-widest">
                    <Plane className="h-4 w-4 animate-bounce" />
                    <span>Generated Schedule</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                    {duration} Days in {selectedDestinationObj?.title}
                  </h2>
                  <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest font-semibold flex flex-wrap gap-x-4 gap-y-1">
                    <span>💵 Budget: {budget}</span>
                    <span>🌿 Pacing: {style}</span>
                    <span>📍 Region: {selectedDestinationObj?.region}</span>
                  </p>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="relative border-l-2 border-emerald-900/10 ml-4 space-y-10">
                  {itinerary.map((dayObj) => (
                    <div key={dayObj.day} className="relative pl-8">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[11px] top-1.5 bg-[#d4af37] text-[#0f5132] font-serif text-[10px] font-extrabold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                        {dayObj.day}
                      </span>
                      
                      <div className="space-y-2 bg-stone-50 border border-emerald-950/5 p-5 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <h4 className="font-serif text-base font-bold text-emerald-950">
                            {dayObj.title}
                          </h4>
                          <span className="inline-flex items-center space-x-1 text-[9px] text-[#0f5132] font-semibold bg-[#d4af37]/20 border border-[#d4af37]/35 rounded-full px-2.5 py-0.5 mt-1 sm:mt-0">
                            <MapPin className="h-2.5 w-2.5" />
                            <span>{dayObj.location}</span>
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-600 leading-relaxed font-light">
                          {dayObj.activity}
                        </p>
                        
                        <div className="border-t border-gray-200/40 pt-2 text-[10px] text-gray-500 font-light italic">
                          <span className="font-semibold uppercase tracking-wider text-[#d4af37] text-[9px] not-italic mr-1.5">Local Tip:</span>
                          {dayObj.tip}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Travel CTA footer */}
                <div className="bg-emerald-950/5 border border-emerald-950/10 p-5 rounded-xl text-center space-y-2 print:hidden">
                  <h4 className="font-serif text-sm font-bold text-emerald-950">Like this Travel Schedule?</h4>
                  <p className="text-[10px] text-gray-500 max-w-md mx-auto">
                    Get in touch with our local travel concierge via the contact form or consult our floating RAG Chatbot to adjust details!
                  </p>
                </div>
              </div>
            ) : (
              /* Idle/Empty State */
              <div className="bg-white text-center py-20 px-4 rounded-2xl border border-emerald-950/5 shadow-md flex flex-col items-center justify-center space-y-4 h-full min-h-[350px]">
                <Calendar className="h-14 w-14 text-emerald-900/10" />
                <h3 className="font-serif text-lg font-bold text-emerald-950">No Itinerary Generated Yet</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Adjust the preferences on the left and click "Generate Travel Plan" to render a customized timeline guide.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// Structured Local Planner Engine
function buildItinerary(destId: string, days: number, budget: string, style: string): ItineraryDay[] {
  const result: ItineraryDay[] = [];
  
  const budgetMultiplier = budget === "Luxury" ? "Premium boutique resorts & upscale private dinners" : budget === "Budget" ? "Local family guesthouses & backpacking hostels" : "Cozy middle-range hotel rooms & standard sightseeing";
  
  if (destId === "hunza-valley") {
    result.push({
      day: 1,
      title: "Arrival in Karimabad & Fort Exploration",
      location: "Karimabad",
      coordinate: "36.3262, 74.6644",
      activity: `Arrive via Gilgit and check in to your ${budget === "Luxury" ? "Luxury Serena resort" : "Cozy local guesthouse"}. Take a walking tour of the Karimabad bazaar and hike up to the 700-year old Baltit Fort. Experience local dried apricots.`,
      tip: "Wear sturdy boots; the cobbled walk up to Baltit Fort is quite steep."
    });
    
    result.push({
      day: 2,
      title: "Attabad Lake Boating & Passu Cones",
      location: "Attabad & Passu",
      coordinate: "36.3117, 74.8690",
      activity: "Drive through the Karakoram highway tunnels. Spend the afternoon boating in the crystal-clear turquoise waters of Attabad Lake. Proceed to Passu to capture photos of the majestic Passu Cathedral Cones and cross the suspension bridge.",
      tip: "Boating rates are negotiable; carry cash as card terminals often lose signal."
    });
    
    result.push({
      day: 3,
      title: "Eagle's Nest Sunrise & Departure",
      location: "Duiker (Eagle's Nest)",
      coordinate: "36.3310, 74.6850",
      activity: "Wake up at 4:30 AM to watch the spectacular sunrise paint Rakaposhi and Golden Peak gold from the Eagle's Nest viewpoint. Have breakfast and travel back to Gilgit.",
      tip: "Bring a light fleece even in summer; the morning breeze is very brisk."
    });
    
    if (days >= 5) {
      result.push({
        day: 4,
        title: "Khunjerab Pass Expedition (China Border)",
        location: "Khunjerab",
        coordinate: "36.8497, 75.4303",
        activity: "Take a full-day excursion to the Pakistan-China Border crossing at 4,693 meters. See the unique high-altitude yak farms and watch for Himalayan ibex along the cliffs.",
        tip: "Due to high altitude, walk slowly and carry hot tea in a thermos."
      });
      
      result.push({
        day: 5,
        title: "Hoper Glacier Tour & Cultural Evening",
        location: "Nagar Valley",
        coordinate: "36.2415, 74.7797",
        activity: "Drive to the adjacent Nagar Valley to visit the active black Hoper Glacier. Return to Karimabad for a traditional organic dinner accompanied by local rubab music.",
        tip: "Try the traditional soup 'Dowdo' - highly nutritious and warming."
      });
    }
    
    if (days >= 7) {
      result.push({
        day: 6,
        title: "Altit Fort & Royal Gardens Leisure",
        location: "Altit",
        coordinate: "36.3144, 74.6797",
        activity: "Spend a relaxing day visiting Altit Fort (older than Baltit) and touring the adjacent organic orchards maintained by local women. Visit the wooden woodcraft cooperative.",
        tip: "Enjoy fresh apricot juice under the shade of the ancient apricot trees."
      });
      
      result.push({
        day: 7,
        title: "Karakoram Highway Scenic Return Cruise",
        location: "Gilgit",
        coordinate: "35.9184, 74.3105",
        activity: "Check out of the hotel and enjoy a slow scenic drive down the KKH, stopping at the Rakaposhi viewpoint for tea and standard photography. Evening flight back.",
        tip: "Keep your camera ready for the collision site of the continental plates."
      });
    }
  } else if (destId === "swat-valley") {
    result.push({
      day: 1,
      title: "Scenic Swat Expressway Drive & Fizagat Park",
      location: "Mingora",
      coordinate: "34.7717, 72.3601",
      activity: `Drive via the Swat Expressway. Check into your hotel in Mingora. Spend the evening relaxing by the rushing Swat River at Fizagat Park, enjoying local grilled trout.`,
      tip: "Trout from the Swat River has a distinct sweet flavor, best enjoyed fresh."
    });
    
    result.push({
      day: 2,
      title: "Alpine Kalam & Mahodand Lake",
      location: "Kalam Valley",
      coordinate: "35.4806, 72.5854",
      activity: "Drive up the scenic valley road to Kalam. Take a 4x4 Jeep ride through the majestic Ushu Pine Forest to the stunning, glacier-fed Mahodand Lake for boating and fishing.",
      tip: "Carry an umbrella; weather around Mahodand Lake can change in minutes."
    });
    
    result.push({
      day: 3,
      title: "Malam Jabba Ski Resort & Departure",
      location: "Malam Jabba",
      coordinate: "34.7992, 72.5728",
      activity: "Travel to Malam Jabba, Pakistan's premier hill station. Ride the chairlift for scenic panoramic views, walk the zipline, and drive back to Islamabad in the afternoon.",
      tip: "Malam Jabba chairlift is extremely popular; buy tickets early to avoid queues."
    });
    
    if (days >= 5) {
      result.push({
        day: 4,
        title: "Ushu Valley Trek & Forest Camping",
        location: "Ushu Valley",
        coordinate: "35.5415, 72.6300",
        activity: "Spend a full day hiking inside the Ushu forest, viewing alpine waterfalls and local shepherd settlements. Experience standard wilderness trail exploration.",
        tip: "Hire a local guide to learn about indigenous medicinal plants."
      });
      
      result.push({
        day: 5,
        title: "Butkara Stupa & Buddhist Heritage Exploration",
        location: "Mingora",
        coordinate: "34.7750, 72.3750",
        activity: "Explore the historic Gandhara civilization ruins of Butkara Stupa, dating back to the 2nd century BCE, and tour the SWAT Archaeological Museum.",
        tip: "Photography inside the museum is allowed, but strictly without flash."
      });
    }
    
    if (days >= 7) {
      result.push({
        day: 6,
        title: "Bahrain Streams & Local Wooden Handcrafts",
        location: "Bahrain",
        coordinate: "35.2015, 72.5400",
        activity: "Spend a leisurely day walking along the rushing stream torrents in Bahrain town. Visit the wood carving markets to purchase local hand-carved cedar furniture.",
        tip: "Handmade wooden boxes make excellent, compact travel souvenirs."
      });
      
      result.push({
        day: 7,
        title: "Leisurely Return Cruise & White Palace tea",
        location: "Marghazar",
        coordinate: "34.6850, 72.3500",
        activity: "Visit the historic White Palace of Marghazar (built in 1940 with white marble). Enjoy afternoon high tea on the royal lawns before returning to Islamabad.",
        tip: "The marble flooring is cold; wear warm socks if walking inside."
      });
    }
  } else {
    // Standard default template generator for other destinations
    for (let i = 1; i <= days; i++) {
      result.push({
        day: i,
        title: `Explore ${selectedDestinationObj?.title} - Day ${i}`,
        location: selectedDestinationObj?.title || "City Center",
        coordinate: "33.6844, 73.0479",
        activity: `Enjoy your custom ${style.toLowerCase()} travel day in ${selectedDestinationObj?.title}. We've coordinated ${budgetMultiplier} to provide maximum comfort. Visit local cultural landmarks, dine on authentic dishes, and catalog spectacular vistas.`,
        tip: "Interact with local tour guides to find the hidden scenic spots."
      });
    }
  }

  return result;
}
