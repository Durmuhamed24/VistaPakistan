import { NextRequest, NextResponse } from "next/server";

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const KNOWLEDGE_BASE = [
  {
    id: "hunza-valley",
    title: "Hunza Valley",
    region: "North",
    category: "Nature & Adventure",
    description:
      "Hunza Valley is a mountainous valley in the northern part of the Gilgit-Baltistan region of Pakistan. Known for its breathtaking scenery, towering peaks, and rich Ismaili culture.",
    highlights: [
      "Baltit Fort",
      "Altit Fort",
      "Attabad Lake",
      "Passu Cones",
      "Karimabad Bazaar",
      "Eagle's Nest viewpoint",
    ],
    best_time:
      "March to October (Spring blossom and Autumn colors are spectacular)",
    how_to_reach:
      "Fly from Islamabad to Gilgit (45 mins) and drive 2 hours to Hunza, or drive via the Karakoram Highway from Islamabad (14-16 hours).",
    difficulty: "Easy to Moderate",
  },
  {
    id: "swat-valley",
    title: "Swat Valley",
    region: "North",
    category: "Nature & History",
    description:
      "Often called the 'Switzerland of the East', Swat Valley is renowned for its lush green meadows, alpine forests, rushing rivers, and ancient Buddhist heritage sites.",
    highlights: [
      "Kalam Valley",
      "Malam Jabba Ski Resort",
      "Fizagat Park",
      "Ushu Forest",
      "Mahodand Lake",
      "Butkara Buddhist Stupa",
    ],
    best_time:
      "April to October (Pleasant summers) or December to February (For snow and skiing in Malam Jabba)",
    how_to_reach:
      "Drive from Islamabad via the Swat Expressway (about 3-4 hours).",
    difficulty: "Easy",
  },
  {
    id: "skardu",
    title: "Skardu Valley",
    region: "North",
    category: "Adventure & Wilderness",
    description:
      "Skardu is the gateway to some of the world's highest peaks, including K2. It is characterized by high-altitude deserts, pristine lakes, and majestic fortresses.",
    highlights: [
      "Deosai National Park (Land of Giants)",
      "Shangrila Lake (Kachura Lake)",
      "Katpana Cold Desert",
      "Kharpocho Fort",
      "Sheosar Lake",
      "Shigar Valley",
    ],
    best_time:
      "June to September (Deosai is accessible and weather is mild)",
    how_to_reach:
      "Direct flight from Islamabad to Skardu (1 hour) or drive via the Karakoram Highway and Skardu Road (20-22 hours).",
    difficulty: "Moderate to Hard (especially Deosai or trekking)",
  },
  {
    id: "lahore-walled-city",
    title: "Walled City of Lahore",
    region: "Central",
    category: "Culture & History",
    description:
      "Lahore is the cultural heart of Pakistan. The ancient Walled City showcases magnificent Mughal architecture, vibrant food streets, and rich historical monuments.",
    highlights: [
      "Badshahi Mosque",
      "Lahore Fort (Shahi Qila)",
      "Sheesh Mahal",
      "Shalimar Gardens",
      "Wazir Khan Mosque",
      "Anarkali Bazaar",
      "Minar-e-Pakistan",
    ],
    best_time:
      "October to March (Winters are cool and pleasant for exploring)",
    how_to_reach:
      "Fly to Lahore International Airport or take the Motorway (M-2) from Islamabad (4 hours).",
    difficulty: "Easy",
  },
  {
    id: "hingol-national-park",
    title: "Hingol National Park",
    region: "South",
    category: "Nature & Wilderness",
    description:
      "Located in Balochistan along the Makran Coastal Highway, Hingol is Pakistan's largest national park, featuring dramatic rock formations, mud volcanoes, and diverse wildlife.",
    highlights: [
      "Princess of Hope rock formation",
      "Sphinx of Balochistan",
      "Hinglaj Mata Mandir (Cave Temple)",
      "Hingol River & Estuary",
      "Kund Malir Golden Beach",
    ],
    best_time:
      "November to February (Summer temperatures can exceed 45°C)",
    how_to_reach:
      "Drive from Karachi via the Makran Coastal Highway (about 3-4 hours).",
    difficulty: "Moderate",
  },
  {
    id: "clifton-karachi",
    title: "Karachi & Clifton Beach",
    region: "South",
    category: "Culture & Metropolis",
    description:
      "Karachi is Pakistan's largest city and financial hub. Clifton Beach along the Arabian Sea is a bustling spot for camel rides, local street food, and ocean breezes.",
    highlights: [
      "Mazar-e-Quaid (Jinnah Mausoleum)",
      "Clifton Beach & Oyster Rocks",
      "Mohatta Palace Museum",
      "Frere Hall",
      "Port Grand Food Enclave",
      "Charna Island (Snorkeling)",
    ],
    best_time:
      "November to February (Mild weather with pleasant sea breeze)",
    how_to_reach:
      "Fly directly to Jinnah International Airport, Karachi.",
    difficulty: "Easy",
  },
  {
    id: "fairy-meadows",
    title: "Fairy Meadows",
    region: "North",
    category: "Nature & Adventure",
    description:
      "Fairy Meadows is a grassland near Nanga Parbat, the ninth-highest mountain in the world. It offers panoramic views of the Himalayas and is a popular base for trekking.",
    highlights: [
      "Nanga Parbat Base Camp Trek",
      "Beyal Camp viewpoint",
      "Raikot Bridge",
      "Stargazing under clear skies",
      "Alpine meadow camping",
    ],
    best_time:
      "May to October (Accessible after snow melts)",
    how_to_reach:
      "Drive from Islamabad to Raikot Bridge (10-12 hours via KKH), then jeep ride and 3-4 hour trek to Fairy Meadows.",
    difficulty: "Moderate to Hard",
  },
  {
    id: "islamabad",
    title: "Islamabad",
    region: "Central",
    category: "Culture & Nature",
    description:
      "The capital city of Pakistan, Islamabad is known for its modern architecture, lush green Margalla Hills, and the iconic Faisal Mosque — one of the largest mosques in the world.",
    highlights: [
      "Faisal Mosque",
      "Margalla Hills trails",
      "Pakistan Monument",
      "Lok Virsa Museum",
      "Daman-e-Koh viewpoint",
      "Saidpur Village",
    ],
    best_time:
      "October to April (Pleasant weather for sightseeing)",
    how_to_reach:
      "Islamabad International Airport receives domestic and international flights.",
    difficulty: "Easy",
  },
];

// ─── Search Logic ─────────────────────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

interface KnowledgeDoc {
  id: string;
  title: string;
  region: string;
  category: string;
  description: string;
  highlights: string[];
  best_time: string;
  how_to_reach: string;
  difficulty: string;
}

function scoreDoc(query: string, doc: KnowledgeDoc): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return 0;

  const titleTokens = tokenize(doc.title);
  const docText = [
    doc.title,
    doc.region,
    doc.category,
    doc.description,
    doc.highlights.join(" "),
    doc.best_time,
    doc.how_to_reach,
  ].join(" ");
  const docTokens = tokenize(docText);

  let score = 0;
  for (const token of queryTokens) {
    if (titleTokens.includes(token)) score += 5;
    else if (titleTokens.some((t) => t.includes(token))) score += 2;
    if (token === doc.region.toLowerCase()) score += 4;
    if (doc.category.toLowerCase().includes(token)) score += 2;
    const count = docTokens.filter((t) => t === token).length;
    if (count > 0) score += Math.min(count * 0.5, 3);
  }
  return score;
}

function searchKnowledgeBase(query: string, limit = 3): KnowledgeDoc[] {
  const scored = KNOWLEDGE_BASE.map((doc) => ({
    score: scoreDoc(query, doc),
    doc,
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0) return KNOWLEDGE_BASE.slice(0, limit);
  return scored.map((s) => s.doc);
}

// ─── Response Generation ──────────────────────────────────────────────────────
function generateResponse(query: string, contextDocs: KnowledgeDoc[]): string {
  const q = query.toLowerCase();

  // Greetings
  if (
    ["hello", "hi", "hey", "greetings", "assalam", "salam", "aoa"].some((g) =>
      q.includes(g)
    )
  ) {
    return (
      "Assalam-o-Alaikum! 🌙 Welcome to VistaPakistan AI Travel Guide.\n\n" +
      "I can help you explore some of the most spectacular destinations in Pakistan:\n\n" +
      "🏔️ **Northern Areas** — Hunza, Swat, Skardu, Fairy Meadows\n" +
      "🕌 **Cultural Heritage** — Lahore's Walled City, Islamabad\n" +
      "🌊 **Coastal Wonders** — Karachi, Hingol National Park\n\n" +
      "Ask me about any destination, best travel times, how to reach, highlights, or trip planning!"
    );
  }

  // Thank you
  if (["thank", "thanks", "shukriya", "jazak"].some((g) => q.includes(g))) {
    return "You're welcome! 😊 If you have more questions about traveling in Pakistan, feel free to ask anytime. Safe travels! 🇵🇰";
  }

  // Weather / best time queries
  if (
    ["weather", "climate", "temperature", "rain", "snow"].some((w) =>
      q.includes(w)
    ) &&
    contextDocs.length > 0
  ) {
    const doc = contextDocs[0];
    return (
      `🌤️ **Weather & Climate for ${doc.title}:**\n\n` +
      `📅 **Best Time to Visit:** ${doc.best_time}\n` +
      `📍 **Region:** ${doc.region} Pakistan\n` +
      `🧗 **Difficulty:** ${doc.difficulty}\n\n` +
      `I recommend planning your trip during the best season for the most enjoyable experience!`
    );
  }

  // If we have context documents
  if (contextDocs.length > 0) {
    const doc = contextDocs[0];

    // Highlights / things to do
    if (
      ["highlight", "todo", "do", "see", "place", "spot", "visit", "attraction", "sight"].some(
        (k) => q.includes(k)
      )
    ) {
      const highlightsList = doc.highlights
        .map((h) => `  • **${h}**`)
        .join("\n");
      return (
        `✨ **Top Highlights of ${doc.title}** (${doc.region} Region):\n\n` +
        `${highlightsList}\n\n` +
        `🌿 **Category:** ${doc.category}\n` +
        `🧗 **Difficulty:** ${doc.difficulty}\n\n` +
        `Would you like a detailed itinerary for ${doc.title}?`
      );
    }

    // How to reach
    if (
      ["reach", "get to", "go to", "travel", "how to", "route", "drive", "fly", "road"].some(
        (k) => q.includes(k)
      )
    ) {
      return (
        `🚗 **How to Reach ${doc.title}:**\n\n` +
        `${doc.how_to_reach}\n\n` +
        `🧗 **Difficulty:** ${doc.difficulty}\n\n` +
        `Need help planning the journey or finding accommodation nearby?`
      );
    }

    // Best time
    if (
      ["time", "month", "season", "when", "best"].some((k) => q.includes(k))
    ) {
      return (
        `📅 **Best Time to Visit ${doc.title}:**\n\n` +
        `${doc.best_time}\n\n` +
        `Planning during this window ensures the best experience!`
      );
    }

    // Itinerary / plan
    if (
      ["itinerary", "plan", "schedule", "trip", "tour", "day"].some((k) =>
        q.includes(k)
      )
    ) {
      const highlightsList = doc.highlights.slice(0, 4).join(", ");
      return (
        `📋 **Suggested Trip Plan for ${doc.title}:**\n\n` +
        `**Day 1:** Arrive and settle in. Explore the local area.\n` +
        `**Day 2:** Visit ${doc.highlights[0] || "main attractions"} and ${doc.highlights[1] || "local landmarks"}.\n` +
        `**Day 3:** Explore ${doc.highlights[2] || "scenic spots"} and ${doc.highlights[3] || "hidden gems"}.\n` +
        `**Day 4:** Free day for adventure activities or relaxation.\n\n` +
        `📍 **Key Spots:** ${highlightsList}\n` +
        `🚗 **Getting There:** ${doc.how_to_reach}\n` +
        `📅 **Best Time:** ${doc.best_time}`
      );
    }

    // General detailed overview (default for destination queries)
    const highlightsList = doc.highlights.join(", ");
    return (
      `Here is what you need to know about **${doc.title}**:\n\n` +
      `**Overview:** ${doc.description}\n\n` +
      `📍 **Region:** ${doc.region} Pakistan\n` +
      `🌿 **Category:** ${doc.category}\n` +
      `📅 **Best Time to Visit:** ${doc.best_time}\n` +
      `🚗 **How to Reach:** ${doc.how_to_reach}\n` +
      `⭐ **Key Highlights:** ${highlightsList}\n` +
      `🧗 **Difficulty:** ${doc.difficulty}\n\n` +
      `Would you like me to generate a trip itinerary for this destination?`
    );
  }

  // General fallback
  return (
    "I'd love to help you explore Pakistan! 🇵🇰\n\n" +
    "I have detailed information about these destinations:\n\n" +
    "🏔️ **Hunza Valley** — Majestic mountains & Karakoram Highway\n" +
    "🌲 **Swat Valley** — Switzerland of the East\n" +
    "⛰️ **Skardu** — Gateway to K2 & Deosai\n" +
    "🏕️ **Fairy Meadows** — Nanga Parbat base camp\n" +
    "🕌 **Lahore** — Mughal architecture & food streets\n" +
    "🏙️ **Islamabad** — Capital city & Margalla Hills\n" +
    "🌵 **Hingol Park** — Rock formations & Makran coast\n" +
    "🌊 **Karachi** — Beaches & metropolitan culture\n\n" +
    "Just ask about any destination, and I'll provide detailed travel guidance!"
  );
}

// ─── API Handler ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query cannot be empty." },
        { status: 400 }
      );
    }

    const sessionId = body.session_id || crypto.randomUUID();

    // Search knowledge base
    const contextDocs = searchKnowledgeBase(query, 3);

    // Generate response
    const responseText = generateResponse(query, contextDocs);

    return NextResponse.json({
      response: responseText,
      session_id: sessionId,
      context: contextDocs,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    mode: "local_knowledge_base",
    destinations: KNOWLEDGE_BASE.length,
  });
}
