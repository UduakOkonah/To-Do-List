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
import { signup, login, getLoggedInUser, logout } from './auth.js';

// Signup form submit
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = signupUsernameInput.value.trim();
  const password = signupPasswordInput.value.trim();

  if (signup(username, password)) {
    alert('Signup successful! Please login.');
  } else {
    alert('Username already taken, try another.');
  }
});

// Login form submit
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (login(username, password)) {
    window.location.href = 'dashboard.html'; // Redirect after successful login
  } else {
    alert('Invalid username or password.');
  }
});

// In dashboard.js, display logged-in username and logout
const usernameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

const currentUser = getLoggedInUser();
if (currentUser) {
  usernameDisplay.textContent = currentUser;
} else {
  // No user logged in, redirect to login page
  window.location.href = 'login.html';
}

logoutBtn.addEventListener('click', () => {
  logout();
  window.location.href = 'login.html';
});

