// Elements
const userNameDisplay = document.getElementById('userNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

const todoListEl = document.getElementById('todoList');
const inprogressListEl = document.getElementById('inprogressList');
const doneListEl = document.getElementById('doneList');

let tasks = [];
const STORAGE_KEY_PREFIX = 'todoTasks_';

function getUsername() {
  return localStorage.getItem('todoUsername');
}

function loadTasks() {
  const username = getUsername();
  if (!username) return [];

  const saved = localStorage.getItem(STORAGE_KEY_PREFIX + username);
  return saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  const username = getUsername();
  if (!username) return;

  localStorage.setItem(STORAGE_KEY_PREFIX + username, JSON.stringify(tasks));
}

function renderTasks() {
  // Clear all lists
  [todoListEl, inprogressListEl, doneListEl].forEach(list => list.innerHTML = '');

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.setAttribute('draggable', 'true');
    li.dataset.id = task.id;
    li.classList.remove('dragging');

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
    delBtn.innerHTML = '&times;';
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });
    li.appendChild(delBtn);

    // Drag events
    li.addEventListener('dragstart', () => {
      li.classList.add('dragging');
    });

    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
    });

    // Append to correct list
    if (task.status === 'todo') todoListEl.appendChild(li);
    else if (task.status === 'inprogress') inprogressListEl.appendChild(li);
    else if (task.status === 'done') doneListEl.appendChild(li);
  });
}

function addTask(text) {
  if (!text.trim()) return;

  tasks.push({
    id: Date.now().toString(),
    text: text.trim(),
    status: 'todo'
  });

  saveTasks();
  renderTasks();
}

function setupDragAndDrop() {
  const columns = document.querySelectorAll('.column');

  columns.forEach(col => {
    col.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      const taskList = col.querySelector('.task-list');
      // Insert before element under mouse, if any
      const afterElement = getDragAfterElement(taskList, e.clientY);
      if (afterElement == null) {
        taskList.appendChild(dragging);
      } else {
        taskList.insertBefore(dragging, afterElement);
      }
    });

    col.addEventListener('drop', () => {
      const dragging = document.querySelector('.dragging');
      if (!dragging) return;

      const id = dragging.dataset.id;
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newStatus = col.dataset.status;
      if (task.status !== newStatus) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
      }
    });
  });
}

// Helper for drag and drop reorder inside column (bonus)
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element || null;
}

// Event listeners
addTaskBtn.addEventListener('click', () => {
  addTask(newTaskInput.value);
  newTaskInput.value = '';
  newTaskInput.focus();
});

newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask(newTaskInput.value);
    newTaskInput.value = '';
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('todoUsername');
  window.location.href = 'index.html';
});

// Initialization
(function init() {
  const username = getUsername();
  if (!username) {
    window.location.href = 'index.html';
    return;
  }
  userNameDisplay.textContent = username;

  tasks = loadTasks();
  renderTasks();
  setupDragAndDrop();
})();

const voiceBtn = document.getElementById('voiceBtn');

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    voiceBtn.textContent = '🎙️ Listening...';
    recognition.start();
  });

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    goalInput.value = speechResult;
    voiceBtn.textContent = '🎤';
  };

  recognition.onend = () => {
    voiceBtn.textContent = '🎤';
  };

  recognition.onerror = (e) => {
    console.error("Speech recognition error:", e.error);
    voiceBtn.textContent = '🎤';
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Speech recognition not supported in this browser.";
}

const aiForm = document.getElementById('aiForm');
const aiInput = document.getElementById('aiInput');
const chatMessages = document.getElementById('chatMessages');
const aiChatBox = document.getElementById('aiChatBox');
const openAI = document.getElementById('openAI');
const closeAI = document.getElementById('closeAI');

// Toggle UI
openAI.addEventListener('click', () => aiChatBox.classList.remove('hidden'));
closeAI.addEventListener('click', () => aiChatBox.classList.add('hidden'));

// Handle chat form
aiForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = aiInput.value.trim();
  if (!prompt) return;

  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = prompt;
  chatMessages.appendChild(userMessage);
  aiInput.value = '';

  // Add loading message
  const aiMessage = document.createElement('div');
  aiMessage.className = 'message ai';
  aiMessage.textContent = 'Typing...';
  chatMessages.appendChild(aiMessage);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Get response
  const response = await askGPT(prompt);
  aiMessage.textContent = response;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


