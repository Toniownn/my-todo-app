# To-Do List Application

A full-stack **To-Do List** application built with **React**, **Node.js**, and **MongoDB**, allowing users to manage tasks with folders, priorities, categories, and more.

---

## Table of Contents

1. [Features](#features)
2. [Assumptions & Decisions](#assumptions--decisions)
3. [Code Structure](#code-structure)
4. [Setup & Run Instructions](#setup--run-instructions)

---

## Features

### Required Features

- **Task Management:** Create, edit, delete tasks.
- **Task Status:** Mark tasks as `pending` or `completed`.
- **Folder Management:** Create and organize tasks in folders.
- **Due Date:** Assign a due date for tasks.

### Optional Features Implemented

- **Priority Levels:** High, Medium, Low (with color-coded badges).
- **Categories:** Assign categories to tasks.
- **Search:** Search tasks by title or description.
- **Filtering:** Filter tasks by status, priority, or category.
- **Sorting:** Sort tasks by due date, priority, or title.

---

## Assumptions & Decisions

- Users must have a **folder** selected before adding a task.
- Task `status` defaults to `pending` if not specified.
- Tasks are fetched and displayed based on the currently selected folder.
- Priority and category are optional fields for tasks; missing values are handled gracefully.
- UI design is **responsive**, supporting mobile and desktop views.
- State management is handled using React's `useState` and `useEffect`; no global state library is used.

---

## Code Structure

project-root/
│
├─ backend/
│ ├─ models/ # Mongoose schemas for Task, Folder, User
│ ├─ controllers/ # API logic (CRUD for tasks and folders)
│ ├─ routes/ # Express routes
│ ├─ middleware/ # Authentication middleware
│ └─ server.js # Express server setup
│
├─ frontend/
│ ├─ components/
│ │ ├─ modal/ # AddFolderModal, AddTaskModal, DeleteModal, EditTaskModal
│ │ ├─ dashboard/ # Dashboard, DashboardHeader, DashboardPage, TodoCard
│ │ ├─ sidebar/ # Sidebar
│ │ └─ ui/ # UI components: Card, Button, Input, etc.
│ ├─ pages/ # Page components (Home.js), (LoginRegister)
│ └─ App.jsx # Main app entry
│
├─ package.json
└─ README.md

**Design Choices**

- **Modular Components:** Dashboard, TodoCard, Sidebar, and Modals are separate components for reusability.
- **REST API:** Express + MongoDB backend with secure routes using JWT.
- **Priority & Category Badges:** Visual cues in TodoCard for quick scanning.
- **Responsive Layout:** Sidebar collapses on mobile, modals handle task creation and editing.

---

## Setup & Run Instructions

### Prerequisites

- Node.js >= 18.x
- MongoDB running locally or a MongoDB Atlas connection
- npm or yarn

### Backend

1. Navigate to the backend folder:

```bash
cd backend

npm install
Create a .env file with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d

Start the server:

npm run dev
Server runs on http://localhost:5000

Frontend
Navigate to the frontend folder:

cd frontend
npm install

Start the development server:

npm start
React app runs on http://localhost:3000

Usage
Register or log in (if auth implemented).

Create folders, add tasks with priorities, categories, and due dates.

Use the Dashboard to edit, delete, filter, search, and sort tasks.

Notes
All API calls require a valid JWT token stored in localStorage.

Modals handle task creation and editing without leaving the page.

Task updates (status, edit, delete) refresh the UI immediately.

Author: [Carl Anthony Dayoc]
License: MIT

```
