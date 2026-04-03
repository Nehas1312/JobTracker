# JobTrackr — MERN Stack Job Application Tracker

A full-stack MERN application to track job applications with a Kanban board, list view, JWT authentication, and full CRUD operations.

---

## Project Structure

```
job-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # register, login, getMe
│   │   └── jobController.js       # CRUD for jobs
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt hashed password)
│   │   └── Job.js                 # Job schema with status enum
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   └── jobRoutes.js           # /api/jobs/*
│   ├── .env.example               # Copy to .env and fill values
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js           # Axios instance with JWT interceptor
    │   │   ├── authApi.js         # Auth API calls
    │   │   └── jobsApi.js         # Jobs CRUD API calls
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── PrivateRoute.jsx
    │   │   ├── jobs/
    │   │   │   ├── FilterBar.jsx
    │   │   │   ├── JobCard.jsx
    │   │   │   ├── JobListView.jsx
    │   │   │   ├── JobModal.jsx
    │   │   │   ├── KanbanBoard.jsx
    │   │   │   └── StatsBar.jsx
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx
    │   │   └── ui/
    │   │       ├── Button.jsx
    │   │       ├── Input.jsx
    │   │       ├── StatusBadge.jsx
    │   │       └── Toast.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Global auth state + login/logout
    │   ├── hooks/
    │   │   ├── useJobs.js         # All job state + API logic
    │   │   └── useToast.js        # Toast notification hook
    │   ├── pages/
    │   │   ├── DashboardPage.jsx  # Main app page
    │   │   ├── LoginPage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── utils/
    │   │   └── constants.js       # Statuses, colors, helpers
    │   ├── App.jsx                # Router + AuthProvider
    │   ├── index.css              # Global styles + CSS variables
    │   └── main.jsx               # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js             # Dev proxy → backend :5000
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone and install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 2. Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRE=7d
NODE_ENV=development
```

> For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

---

### 3. Run the app

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# → Server running on port 5000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → Vite running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint    | Access  | Description          |
|--------|-------------|---------|----------------------|
| POST   | `/register` | Public  | Create a new account |
| POST   | `/login`    | Public  | Login, returns JWT   |
| GET    | `/me`       | Private | Get logged-in user   |

### Jobs — `/api/jobs` (all protected)

| Method | Endpoint  | Description              |
|--------|-----------|--------------------------|
| GET    | `/`       | Get all jobs (+ filters) |
| POST   | `/`       | Create a new job         |
| GET    | `/:id`    | Get a single job         |
| PUT    | `/:id`    | Update a job             |
| DELETE | `/:id`    | Delete a job             |

Query params for `GET /api/jobs`: `?status=Applied&search=google`

---

## Features

- **JWT Authentication** — Register, login, protected routes
- **Kanban Board** — Drag and drop cards between status columns
- **List View** — Table with inline status updates
- **Full CRUD** — Add, edit, delete jobs with a modal form
- **Stats Bar** — Click any stat to filter by that status
- **Search & Filter** — Filter by company, role, location, or status
- **Optimistic Updates** — Status changes feel instant
- **Toast Notifications** — Feedback on every action

---

## Deployment

### Backend → [Render](https://render.com)
1. Push to GitHub
2. Create a new **Web Service** on Render, point to `/backend`
3. Set environment variables (same as `.env`)
4. Build command: `npm install` | Start command: `node server.js`

### Frontend → [Vercel](https://vercel.com)
1. Create a new project, point to `/frontend`
2. Add env variable: `VITE_API_URL=https://your-backend.onrender.com`
3. Update `frontend/src/api/axios.js` baseURL to use `import.meta.env.VITE_API_URL`

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, React Router v6   |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB, Mongoose                 |
| Auth      | JWT, bcryptjs                     |
| HTTP      | Axios (with interceptors)         |
| Validation| express-validator                 |

---
