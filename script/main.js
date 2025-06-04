import { getRandomSuggestions } from './suggestions.js';

window.addEventListener('DOMContentLoaded', () => {
  displaySuggestions();
});

function displaySuggestions() {
  const suggestionsContainer = document.getElementById('suggestions');
  if (!suggestionsContainer) return;

  const suggestions = getRandomSuggestions();
  suggestionsContainer.innerHTML = `
    <h3>✨ Smart Suggestions</h3>
    <ul>
      ${suggestions.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

import { breakdownGoal } from './goalAssistant.js';
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const breakdownOutput = document.getElementById('goalBreakdown');

if (goalForm) {
  goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const goal = goalInput.value.trim();
    if (goal) {
      const steps = breakdownGoal(goal);
      breakdownOutput.innerHTML = `
        <h3>🧠 Goal Breakdown</h3>
        <ul>${steps.map(step => `<li>${step}</li>`).join('')}</ul>
      `;
    }
  });
}

