# To-Do-List

A creative, responsive, and professional **To-Do List** web app with user login, task management by status, drag-and-drop interaction, animations, and local storage persistence. Perfect for organizing tasks by *To Do*, *In Progress*, and *Done* with a beautiful pink color scheme.

---

## Features

- **Login Page:** 
  - Enter your username and be greeted personally.
  - Left side features an aesthetic pink-themed image.
  - Right side contains a clean, accessible login form.
  - Saves username in localStorage for session persistence.

- **Dashboard (Task Tracker):** 
  - Displays a welcome message using the logged-in username.
  - Add new tasks with an input form.
  - Tasks organized into three columns: To Do, In Progress, Done.
  - Drag and drop tasks between columns with smooth animations.
  - Delete tasks with a single click.
  - Data persists in localStorage per user.
  - Responsive design for desktop and mobile.
  - Logout button to clear session and return to login.

---

## Folder Structure
project-root/
├── html/
│ ├── index.html # Login page
│ └── dashboard.html # Task tracker dashboard
├── css/
│ ├── login.css # Styles for login page
│ └── dashboard.css # Styles for dashboard page
└── js/
├── login.js # JavaScript for login functionality
└── dashboard.js # JavaScript for task tracker functionality


---

## How to Use

1. Open `html/index.html` in a browser.
2. Enter your name and click **Continue**.
3. You will be redirected to the dashboard where you can:
   - Add tasks.
   - Drag and drop tasks between *To Do*, *In Progress*, and *Done* columns.
   - Delete tasks by clicking the ✕ icon.
4. Your tasks and username are saved in your browser’s localStorage.
5. Use the **Logout** button to end the session and return to login.

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, animations, responsive design)
- JavaScript (DOM manipulation, event handling, drag and drop API)
- Local Storage for data persistence

---

## Accessibility

- ARIA labels and roles for form and task areas.
- Keyboard focusable buttons and inputs.
- Live regions update task lists for screen readers.

---

## Customization

- Pink color scheme using gradients and shadows.
- Smooth animations on adding, dragging, and deleting tasks.
- Responsive layout that works well on desktop and mobile devices.

---

## Future Improvements

- Add task deadlines and reminders.
- Enable editing tasks after creation.
- Support multiple users with proper authentication.
- Sync tasks with backend or cloud storage.

---

## License

This project is open-source and free to use.

---

## Author

Developed by Uduakobong Lawrence Okonah

---

Thank you for using this task tracker! Stay productive and organized! 💖


