// auth.js

// Key names in localStorage
const USERS_KEY = 'todoAppUsers';
const LOGGED_IN_USER_KEY = 'todoAppLoggedInUser';

/**
 * Get all users from localStorage, parsed as an object.
 * Returns an object where keys are usernames and values are passwords.
 */
function getUsers() {
  const usersJSON = localStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : {};
}

/**
 * Save users object back to localStorage as JSON string.
 * @param {Object} users - Object of users with username: password pairs.
 */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Register a new user.
 * @param {string} username 
 * @param {string} password
 * @returns {boolean} true if user created successfully, false if username taken
 */
export function signup(username, password) {
  const users = getUsers();
  if (users[username]) {
    // Username already exists
    return false;
  }
  // Save new user
  users[username] = password; // Note: For real apps, hash passwords! This is just demo.
  saveUsers(users);
  return true;
}

/**
 * Login user by verifying username and password.
 * @param {string} username 
 * @param {string} password
 * @returns {boolean} true if login success, false otherwise
 */
export function login(username, password) {
  const users = getUsers();
  if (users[username] && users[username] === password) {
    // Save logged in user
    localStorage.setItem(LOGGED_IN_USER_KEY, username);
    return true;
  }
  return false;
}

/**
 * Get current logged in username or null if none.
 * @returns {string|null}
 */
export function getLoggedInUser() {
  return localStorage.getItem(LOGGED_IN_USER_KEY);
}

/**
 * Logout the current user.
 */
export function logout() {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
}
