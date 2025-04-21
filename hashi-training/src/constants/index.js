import { HomeIcon, Search, Video } from "lucide-react";
export const MenuItems = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Create Video", url: "/create", icon: Video },
  { title: "Explore", url: "/dashboard", icon: Search },
  // { title: "Billing", url: "/", icon: PiggyBank },
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
    image: "/styles/realistic.webp",
  },
  {
    name: "Cartoon",
    image: "/styles/cartoon.webp",
  },
  {
    name: "Cinematic",
    image: "/styles/cinematic.webp",
  },
  {
    name: "Cyberpunk",
    image: "/styles/cyberpunk.webp",
  },
  {
    name: "GTA",
    image: "/styles/gta.webp",
  },
  {
    name: "Watercolor",
    image: "/styles/watercolor.webp",
  },
];

export const CAPTION_STYLES = [
  {
    name: "Youtuber",
    style: "font-bold text-yellow-400 text-3xl tracking-tight",
  },
  {
    name: "Supreme",
    style:
      "font-extrabold text-red-500 text-3xl italic font-['Futura',_sans-serif]",
  },
  {
    name: "Neon",
    style:
      "font-extrabold text-3xl text-white animate-pulse [text-shadow:_0_0_5px_#0ff,_0_0_10px_#0ff,_0_0_15px_#0ff,_0_0_20px_#0ff]",
  },
  {
    name: "Glitch",
    style: "font-black bold text-purple-500 text-3xl",
  },
  {
    name: "Fire",
    style:
      "via-red-500 to-red-700 hover:from-yellow-500 hover:via-red-600 hover:to-red-800 font-bold text-orange-400 text-3xl",
  },
  {
    name: "Futuristic",
    style: "font-bold text-blue-500 text-3xl tracking-widest",
  },
];

export const PROMPT_SCRIPT = `Write two different scripts for 15 seconds video on topic: {topic}.
Do not add Scene description.
Do not add anything in braces, just return the plain story in text.
Don't make the script too long.
Give me the response in json format and follow the schema: 
{ scripts: [{
  content: ''},]}
`;

export const GENERATE_IMAGES_PROMPT_SCRIPT = `Generate a series of detailed image prompts based on the provided video script, formatted in a {style} style. 

### Instructions:
- Break the script into meaningful segments that correspond to key scenes in a 30-second video.
- For each segment, generate an image description that visually represents the scene.
- Keep the descriptions highly detailed, focusing on characters, settings, lighting, and emotions.
- **Do NOT** include camera angles or technical photography terms.

### Output Format (JSON, max 3 images):
[
  {
    "imagePrompt": "<Detailed image description>",
    "sceneContent": "<Corresponding script segment>"
  }
]

### Video Script:
{script}`;

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
