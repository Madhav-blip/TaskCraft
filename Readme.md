# TaskCraft

TaskCraft is a full-stack task management web application that allows users to register, log in securely, and manage their daily tasks. It is built using the MERN stack (MongoDB, Express.js, React, Node.js) and follows a client-server architecture.

---

## Features

- User Registration
- User Login using JWT Authentication
- Protected Routes
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- User Profile Management
- Responsive User Interface

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

# Project Structure

```
TaskCraft/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# How the Application Works

## 1. User Authentication

- A new user registers using the Register page.
- Passwords are encrypted using bcrypt before storing them in MongoDB.
- During login, credentials are verified.
- If successful, the backend generates a JWT token.
- The token is stored on the client side and attached to future API requests.

---

## 2. Protected Routes

Only authenticated users can access:

- Dashboard
- Task Management
- Profile Page

Unauthenticated users are redirected to the Login page.

---

## 3. Task Management

After logging in, users can:

- Create new tasks
- View existing tasks
- Edit tasks
- Delete completed or unwanted tasks

Each task belongs only to its authenticated user.

---

## 4. Backend Workflow

The Express server:

- Receives API requests
- Validates JWT tokens
- Performs CRUD operations
- Communicates with MongoDB
- Returns JSON responses

---

## 5. Frontend Workflow

The React frontend:

- Handles routing using React Router
- Sends API requests using Axios
- Displays task data dynamically
- Updates the UI without page refresh

---

# API Endpoints

## Authentication

```
POST /auth/register
POST /auth/login
```

## Tasks

```
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

## Users

```
GET /users/profile
```

---

# Running the Project Locally

## Prerequisites

Install:

- Node.js
- npm
- MongoDB (or MongoDB Atlas)
- Git

---

## Step 1: Clone Repository

```bash
git clone https://github.com/Madhav-blip/TaskCraft.git
```

```
cd TaskCraft
```

---

## Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

---

## Step 3: Configure Backend Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```env
PORT=5000
NODE_ENV=development
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

## Step 4: Start Backend

```bash
npm start
```

The backend runs on:

```
http://localhost:5000
```

---

## Step 5: Install Frontend Dependencies

Open another terminal.

```bash
cd client
npm install
```

---

## Step 6: Configure Frontend Environment Variables

Create:

```
.env.development
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

---

## Step 7: Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Deployment

## Backend

Deployed on Render.

## Frontend

Deployed on Vercel.