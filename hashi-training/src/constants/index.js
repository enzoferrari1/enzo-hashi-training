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

export const PROMPT_SCRIPT = `Write two different scripts for 30 seconds video on topic: {topic}.
Do not add Scene description.
Do not add anything in braces, just return the plain story in text. 
Give me the response in json format and follow the schema: 
{ scripts: [{
  content: ''},]}
`;
