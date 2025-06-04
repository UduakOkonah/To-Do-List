export function breakdownGoal(goal) {
  const templates = {
    "portfolio": [
      "Plan your portfolio layout",
      "Design the homepage",
      "Add your best projects",
      "Write about yourself",
      "Deploy on Netlify or GitHub Pages"
    ],
    "blog": [
      "Pick a blog topic",
      "Write your first draft",
      "Design blog layout",
      "Add a contact section",
      "Publish and share"
    ],
    "app": [
      "Define the app’s purpose",
      "Sketch wireframes",
      "Break it into components",
      "Code the frontend/backend",
      "Test and deploy"
    ],
    "project": [
      "Define your project goal",
      "Research similar solutions",
      "Build a rough prototype",
      "Refine and test",
      "Launch it!"
    ],
    "resume": [
      "List your skills and experiences",
      "Write a strong summary",
      "Format using Canva or Word",
      "Proofread carefully",
      "Export to PDF and save"
    ],
    "startup": [
      "Define your product idea",
      "Identify your target audience",
      "Validate with a survey or MVP",
      "Build your landing page",
      "Pitch or find co-founders"
    ],
    "freelance": [
      "Set your hourly rate",
      "Build a simple portfolio site",
      "Sign up on freelance platforms",
      "Offer 1-2 free gigs for testimonials",
      "Start applying consistently"
    ],
    "learn javascript": [
      "Understand variables & data types",
      "Practice functions and loops",
      "Learn DOM manipulation",
      "Build a small app",
      "Try a coding challenge"
    ],
    "youtube channel": [
      "Pick a niche",
      "Plan your first 5 videos",
      "Create a consistent style",
      "Record and edit your first video",
      "Publish and share on social media"
    ],
    "ai tool": [
      "Define the AI task (chatbot, classifier, etc.)",
      "Choose model or API (or simulate)",
      "Design your UI flow",
      "Integrate the logic",
      "Test and collect feedback"
    ],
    "study plan": [
      "Set a clear end goal (exam, certification)",
      "Break subjects by week",
      "Allocate daily time blocks",
      "Include rest/review days",
      "Track and adjust weekly"
    ],
    "ecommerce site": [
      "Pick products or niche",
      "Choose a platform (Shopify, Woo)",
      "Design your storefront",
      "Add product listings and checkout",
      "Launch and market online"
    ],
    "course": [
      "Choose your course topic",
      "Break it into modules",
      "Write scripts or outlines",
      "Record each section",
      "Upload and launch!"
    ]
  };

  const lower = goal.toLowerCase();
  const matchedKey = Object.keys(templates).find(k => lower.includes(k));

  return matchedKey ? templates[matchedKey] : [
    `Break "${goal}" into 3 smaller subtasks`,
    "Prioritize the steps by importance",
    "Set a timeline or milestone for each part"
  ];
}
