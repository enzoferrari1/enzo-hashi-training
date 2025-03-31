import { HomeIcon, Search, Video, PiggyBank } from "lucide-react";
export const MenuItems = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Create Video", url: "/create", icon: Video },
  { title: "Explore", url: "/", icon: Search },
  { title: "Billing", url: "/", icon: PiggyBank },
];

export const suggestions = [
  "Horror Stories",
  "Tech Breakthroughs",
  "Fitness Tips",
  "Movie Reviews",
  "True Crime Cases",
  "Historical Mysteries",
  "DIY Projects",
  "Unsolved Mysteries",
  "Mind-Blowing Facts",
  "Travel Destinations",
  "Motivational Quotes",
  "Gaming News",
];

export const VIDEO_STYLES = [
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
  {
    name: "Realistic",
    image: "/realistic.webp",
  },
];

export const PROMPT_SCRIPT = `Write two different scripts for 30 seconds video on topic: {topic}.
Do not add Scene description.
Do not add anything in braces, just return the plain story in text. 
Give me the response in json format and follow the schema: 
{ scripts: [{
  content: ''},]}
`;

export const DEFAULT_VOICES_ID = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
  { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
  { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
  { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
  { voice_id: "SAz9YHcvj6GT2YYXdXww", name: "River" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
  { voice_id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice" },
  { voice_id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },
  { voice_id: "bIHbv24MWmeRgasZH58o", name: "Will" },
  { voice_id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },
  { voice_id: "cjVigY5qzO86Huf0OWal", name: "Eric" },
  { voice_id: "iP95p4xoKVk53GoZ742B", name: "Chris" },
  { voice_id: "nPczCjzI2devNBz1zQrb", name: "Brian" },
  { voice_id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
  { voice_id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
  { voice_id: "pqHfZKP75CvOlQylNhV4", name: "Bill" },
];
