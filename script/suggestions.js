const suggestionList = [
  "Review your project goals",
  "Plan your week ahead",
  "Refactor old code",
  "Take a 10-minute break",
  "Organize your files",
  "Read a tech blog",
  "Update your portfolio",
  "Drink a glass of water 💧",
  "Commit code to GitHub",
  "Learn one new JavaScript function",
  "Write a short blog post",
  "Practice a CSS animation",
  "Backup your files",
  "Clean your codebase",
  "Optimize images for your website",
  "Take a screen break 🧘",
  "Organize your to-do board",
  "Check your GitHub contributions",
  "Ask ChatGPT a coding question 🤖",
  "Set goals for the next 3 days",
  "Try a coding challenge on LeetCode",
  "Fix one bug you’ve been ignoring",
  "Update your LinkedIn with a project",
  "Create a mood board for UI ideas",
  "Sketch a wireframe for your next app",
  "Write tests for your current project",
  "Review your learning notes",
  "Help a beginner in a coding forum",
  "Check your browser console for errors",
  "Clean up unused files and folders",
  "Watch a 5-minute JavaScript tip video"
];

export function getRandomSuggestions(count = 3) {
  const shuffled = suggestionList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
