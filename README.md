# Task Manager Web Application

## 📌 Project Overview

The Task Manager is a full-stack web application that allows users to manage their daily tasks efficiently. Users can create, view, update, and delete tasks while keeping track of their progress. The application includes secure authentication, protected routes, and a user-friendly interface.

This project demonstrates full-stack development skills using modern web technologies and showcases how authentication and task management can be implemented in a real-world application.

---

## 🚀 Features

### User Authentication

* User signup and login functionality
* Secure authentication using JWT tokens
* Protected routes that prevent unauthorized access

### Task Management

* Create new tasks
* View all tasks
* Mark tasks as completed
* Delete tasks

### User Interface

* Responsive design using Tailwind CSS
* Dashboard for viewing tasks
* Separate Task Management page
* Navigation bar for easy navigation

### Dark Mode Support

* Toggle between light mode and dark mode
* Theme preference stored using Local Storage

---

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Other Tools

* Git
* GitHub
* Netlify (for deployment)

---

## 📂 Project Structure

```
task-manager
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── Pages
│   │   ├── components
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/task-manager.git
```

### 2️⃣ Navigate to the project directory

```
cd task-manager
```

### 3️⃣ Install dependencies

Frontend:

```
npm install
```

Backend:

```
cd backend
npm install
```

### 4️⃣ Run the backend server

```
npm start
```

### 5️⃣ Run the frontend application

```
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers or logs into the application.
2. The server generates a JWT token.
3. The token is stored in the browser local storage.
4. Protected routes verify the token before allowing access.

---

## 🌐 Deployment

The frontend of the application is deployed using Netlify.
The backend API runs locally or can be deployed using services like Render or Railway.

---

## 📸 Screenshots

You can add screenshots of:

* Login Page
* Dashboard
* Task Management Page
* Dark Mode Interface

---

## 📈 Future Improvements

* Task deadlines and reminders
* Task categories or labels
* Drag-and-drop task management
* Email notifications
* User profile management

---

## 👩‍💻 Author

Developed by **[Your Name]**

This project was created as part of a full-stack development learning journey and demonstrates practical implementation of modern web development technologies.
