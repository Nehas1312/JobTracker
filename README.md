# JobTrackr — MERN Stack Job Application Tracker with AI Resume Analyzer

A full-stack MERN application to track job applications with a Kanban board, list view, JWT authentication, full CRUD operations, and an AI-powered resume analyzer built with Google Gemini.

---

## Project Structure

```
job-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                      # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.middleware.js          # JWT protect middleware
│   │   ├── models/
│   │   │   ├── user.model.js              # User schema (bcrypt hashed password)
│   │   │   ├── job.model.js               # Job schema with status enum
│   │   │   └── analysis.model.js          # Analysis schema for AI results
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.js        # Register, login business logic
│   │   │   │   ├── auth.controller.js     # Handles req and res for auth
│   │   │   │   └── auth.routes.js         # /api/auth/*
│   │   │   ├── jobs/
│   │   │   │   ├── jobs.service.js        # Jobs CRUD business logic
│   │   │   │   ├── jobs.controller.js     # Handles req and res for jobs
│   │   │   │   └── jobs.routes.js         # /api/jobs/*
│   │   │   └── analyze/
│   │   │       ├── analyze.service.js     # PDF parsing + Gemini AI logic
│   │   │       ├── analyze.controller.js  # Handles req and res for analyze
│   │   │       └── analyze.routes.js      # /api/analyze/*
│   │   └── app.js                         # Express setup + routes
│   ├── uploads/                           # Temp PDF storage (memory in production)
│   ├── .env.example                       # Copy to .env and fill values
│   ├── package.json
│   └── server.js                          # Entry point — starts the server
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js                   # Axios instance with JWT interceptor
    │   │   ├── authApi.js                 # Auth API calls
    │   │   ├── jobsApi.js                 # Jobs CRUD API calls
    │   │   └── analyzeApi.js              # Resume analyze API calls
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── PrivateRoute.jsx       # Blocks dashboard if not logged in
    │   │   ├── jobs/
    │   │   │   ├── FilterBar.jsx
    │   │   │   ├── JobCard.jsx
    │   │   │   ├── JobListView.jsx
    │   │   │   ├── JobModal.jsx
    │   │   │   ├── KanbanBoard.jsx
    │   │   │   └── StatsBar.jsx
    │   │   ├── analyze/
    │   │   │   ├── UploadForm.jsx         # PDF drag and drop + job desc input
    │   │   │   ├── ScoreCard.jsx          # ATS score and match score circles
    │   │   │   ├── ResultSection.jsx      # Strengths, keywords, suggestions
    │   │   │   └── HistoryCard.jsx        # One past analysis card
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx
    │   │   └── ui/
    │   │       ├── Button.jsx
    │   │       ├── Input.jsx
    │   │       ├── StatusBadge.jsx
    │   │       └── Toast.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx            # Global auth state + login/logout
    │   ├── hooks/
    │   │   ├── useJobs.js                 # All job state + API logic
    │   │   └── useToast.js                # Toast notification hook
    │   ├── pages/
    │   │   ├── DashboardPage.jsx          # Kanban + List view
    │   │   ├── AnalyzePage.jsx            # Resume analyzer page
    │   │   ├── AnalysisDetailPage.jsx     # Full detail of one past analysis
    │   │   ├── LoginPage.jsx
    │   │   └── RegisterPage.jsx
    │   ├── utils/
    │   │   └── constants.js               # Statuses, colors, helpers
    │   ├── App.jsx                        # Router + AuthProvider
    │   ├── index.css                      # Global styles + CSS variables
    │   └── main.jsx                       # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js                     # Dev proxy → backend :5000
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account — [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Google Gemini API key — [aistudio.google.com](https://aistudio.google.com) (free)

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
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/job-tracker
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

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

| Method | Endpoint    | Access  | Description        |
|--------|-------------|---------|--------------------|
| POST   | `/register` | Public  | Create new account |
| POST   | `/login`    | Public  | Login, returns JWT |
| GET    | `/me`       | Private | Get logged-in user |

### Jobs — `/api/jobs` (all protected)

| Method | Endpoint | Description              |
|--------|----------|--------------------------|
| GET    | `/`      | Get all jobs (+ filters) |
| POST   | `/`      | Create a new job         |
| GET    | `/:id`   | Get a single job         |
| PUT    | `/:id`   | Update a job             |
| DELETE | `/:id`   | Delete a job             |

Query params for `GET /api/jobs`: `?status=Applied&search=google`

### Analyze — `/api/analyze` (all protected)

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| POST   | `/`         | Analyze resume — ATS score only      |
| POST   | `/match`    | Analyze resume + job description     |
| GET    | `/history`  | Get all past analyses                |
| GET    | `/:id`      | Get one full analysis                |

---

## Features

### Job Tracker
- **JWT Authentication** — Register, login, protected routes
- **Kanban Board** — Drag and drop cards between status columns
- **List View** — Table with inline status updates
- **Full CRUD** — Add, edit, delete jobs with a modal form
- **Stats Bar** — Click any stat to filter by that status
- **Search and Filter** — Filter by company, role, location, or status
- **Optimistic Updates** — Status changes feel instant
- **Toast Notifications** — Feedback on every action

### AI Resume Analyzer
- **ATS Score** — Get a score out of 100 for your resume
- **Job Match Score** — See how well your resume fits a specific job
- **Strengths** — What your resume is already doing well
- **Missing Keywords** — Keywords you need to add
- **Matched Keywords** — Keywords from the job description already in your resume
- **Suggestions** — Specific actionable improvements
- **Analysis History** — All past analyses saved to your account

---

## Deployment

### Backend → [Render](https://render.com)
1. Push to GitHub
2. Create a new **Web Service**, set root directory to `backend`
3. Build command: `npm install` | Start command: `node server.js`
4. Add environment variables in Render dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `GEMINI_API_KEY`
   - `CLIENT_URL` → your frontend Render URL
   - `NODE_ENV` → `production`

### Frontend → [Render](https://render.com)
1. Create a new **Static Site**, set root directory to `frontend`
2. Build command: `npm install && npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Add rewrite rule: Source `/*` → Destination `/index.html` → Type `Rewrite`

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, React Router v6     |
| Backend    | Node.js, Express.js (ES Modules)    |
| Database   | MongoDB Atlas, Mongoose             |
| Auth       | JWT, bcryptjs                       |
| AI         | Google Gemini 1.5 Flash             |
| File Upload| Multer (memory storage)             |
| PDF Parse  | pdf-parse                           |
| HTTP       | Axios (with interceptors)           |
| Validation | express-validator                   |

---

## Live Demo

- Frontend: [job-tracker-app.onrender.com](https://job-tracker-app.onrender.com)
- Backend API: [job-tracker-api.onrender.com/api/health](https://job-tracker-api.onrender.com/api/health)
