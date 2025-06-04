// Elements
const showLoginBtn = document.getElementById('showLoginBtn');
const showSignupBtn = document.getElementById('showSignupBtn');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');

const STORAGE_USERS_KEY = 'todoUsers';

// Helper: get all users from localStorage or empty array
function getUsers() {
  const data = localStorage.getItem(STORAGE_USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Helper: save all users to localStorage
function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

// Switch to login form
showLoginBtn.addEventListener('click', () => {
  showLoginBtn.classList.add('active');
  showLoginBtn.setAttribute('aria-pressed', 'true');
  showSignupBtn.classList.remove('active');
  showSignupBtn.setAttribute('aria-pressed', 'false');
  signupForm.hidden = true;
  loginForm.hidden = false;
  clearErrors();
});

// Switch to signup form
showSignupBtn.addEventListener('click', () => {
  showSignupBtn.classList.add('active');
  showSignupBtn.setAttribute('aria-pressed', 'true');
  showLoginBtn.classList.remove('active');
  showLoginBtn.setAttribute('aria-pressed', 'false');
  loginForm.hidden = true;
  signupForm.hidden = false;
  clearErrors();
});

function clearErrors() {
  loginError.textContent = '';
  signupError.textContent = '';
}

// Handle Login Submit
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const username = loginForm.loginUsername.value.trim();
  const password = loginForm.loginPassword.value;

  if (!username || !password) {
    loginError.textContent = 'Please fill in all fields.';
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (!user) {
    loginError.textContent = 'User not found. Please sign up first.';
    return;
  }

  if (user.password !== password) {
    loginError.textContent = 'Incorrect password.';
    return;
  }

  // Successful login: save current user and redirect
  localStorage.setItem('todoUsername', user.username);
  window.location.href = 'dashboard.html';
});

// Handle Signup Submit
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const username = signupForm.signupUsername.value.trim();
  const email = signupForm.signupEmail.value.trim();
  const password = signupForm.signupPassword.value;
  const confirmPassword = signupForm.signupConfirmPassword.value;

  if (!username || !email || !password || !confirmPassword) {
    signupError.textContent = 'Please fill in all fields.';
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    signupError.textContent = 'Please enter a valid email address.';
    return;
  }

  if (password.length < 6) {
    signupError.textContent = 'Password must be at least 6 characters.';
    return;
  }

  if (password !== confirmPassword) {
    signupError.textContent = 'Passwords do not match.';
    return;
  }

  const users = getUsers();

  // Check if username or email already exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    signupError.textContent = 'Username already taken.';
    return;
  }

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    signupError.textContent = 'Email already registered.';
    return;
  }

  // Save new user
  users.push({
    username,
    email,
    password // NOTE: In real apps, NEVER store plaintext passwords!
  });

  saveUsers(users);

  // Auto-login new user
  localStorage.setItem('todoUsername', username);
  window.location.href = 'dashboard.html';
});
