export interface Destination {
  id: string;
  title: string;
  region: string;
  category: string;
  description: string;
  highlights: string[];
  best_time: string;
  how_to_reach: string;
  difficulty: "Easy" | "Easy to Moderate" | "Moderate" | "Moderate to Hard";
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "hunza-valley",
    title: "Hunza Valley",
    region: "North",
    category: "Nature & Adventure",
    description: "Hunza Valley is a mountainous valley in the northern part of the Gilgit-Baltistan region of Pakistan. Known for its breathtaking scenery, towering peaks, and rich Ismaili culture.",
    highlights: ["Baltit Fort", "Altit Fort", "Attabad Lake", "Passu Cones", "Karimabad Bazaar", "Eagle's Nest viewpoint"],
    best_time: "March to October (Spring blossom and Autumn colors are spectacular)",
    how_to_reach: "Fly from Islamabad to Gilgit (45 mins) and drive 2 hours to Hunza, or drive via the Karakoram Highway from Islamabad (14-16 hours).",
    difficulty: "Easy to Moderate",
    image: "/images/hunza.jpg"
  },
  {
    id: "swat-valley",
    title: "Swat Valley",
    region: "North",
    category: "Nature & History",
    description: "Often called the 'Switzerland of the East', Swat Valley is renowned for its lush green meadows, alpine forests, rushing rivers, and ancient Buddhist heritage sites.",
    highlights: ["Kalam Valley", "Malam Jabba Ski Resort", "Fizagat Park", "Ushu Forest", "Mahodand Lake", "Butkara Buddhist Stupa"],
    best_time: "April to October (Pleasant summers) or December to February (For snow and skiing in Malam Jabba)",
    how_to_reach: "Drive from Islamabad via the Swat Expressway (about 3-4 hours).",
    difficulty: "Easy",
    image: "/images/swat.jpg"
  },
  {
    id: "skardu",
    title: "Skardu Valley",
    region: "North",
    category: "Adventure & Wilderness",
    description: "Skardu is the gateway to some of the world's highest peaks, including K2. It is characterized by high-altitude deserts, pristine lakes, and majestic fortresses.",
    highlights: ["Deosai National Park (Land of Giants)", "Shangrila Lake (Kachura Lake)", "Katpana Cold Desert", "Kharpocho Fort", "Sheosar Lake", "Shigar Valley"],
    best_time: "June to September (Deosai is accessible and weather is mild)",
    how_to_reach: "Direct flight from Islamabad to Skardu (1 hour) or drive via the Karakoram Highway and Skardu Road (20-22 hours).",
    difficulty: "Moderate to Hard",
    image: "/images/skardu.jpg"
  },
  {
    id: "lahore-walled-city",
    title: "Walled City of Lahore",
    region: "Central",
    category: "Culture & History",
    description: "Lahore is the cultural heart of Pakistan. The ancient Walled City showcases magnificent Mughal architecture, vibrant food streets, and rich historical monuments.",
    highlights: ["Badshahi Mosque", "Lahore Fort (Shahi Qila)", "Sheesh Mahal", "Shalimar Gardens", "Wazir Khan Mosque", "Anarkali Bazaar", "Minar-e-Pakistan"],
    best_time: "October to March (Winters are cool and pleasant for exploring)",
    how_to_reach: "Fly to Lahore International Airport or take the Motorway (M-2) from Islamabad (4 hours).",
    difficulty: "Easy",
    image: "/images/lahore.jpg"
  },
  {
    id: "hingol-national-park",
    title: "Hingol National Park",
    region: "South",
    category: "Nature & Wilderness",
    description: "Located in Balochistan along the Makran Coastal Highway, Hingol is Pakistan's largest national park, featuring dramatic rock formations, mud volcanoes, and diverse wildlife.",
    highlights: ["Princess of Hope rock formation", "Sphinx of Balochistan", "Hinglaj Mata Mandir (Cave Temple)", "Hingol River & Estuary", "Kund Malir Golden Beach"],
    best_time: "November to February (Summer temperatures can exceed 45°C)",
    how_to_reach: "Drive from Karachi via the Makran Coastal Highway (about 3-4 hours).",
    difficulty: "Moderate",
    image: "/images/hingol.jpg"
  },
  {
    id: "clifton-karachi",
    title: "Karachi & Clifton Beach",
    region: "South",
    category: "Culture & Metropolis",
    description: "Karachi is Pakistan's largest city and financial hub. Clifton Beach along the Arabian Sea is a bustling spot for camel rides, local street food, and ocean breezes.",
    highlights: ["Mazar-e-Quaid (Jinnah Mausoleum)", "Clifton Beach & Oyster Rocks", "Mohatta Palace Museum", "Frere Hall", "Port Grand Food Enclave", "Charna Island (Snorkeling)"],
    best_time: "November to February (Mild weather with pleasant sea breeze)",
    how_to_reach: "Fly directly to Jinnah International Airport, Karachi.",
    difficulty: "Easy",
    image: "/images/karachi.jpg"
  }
];
