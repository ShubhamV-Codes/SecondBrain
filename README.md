# 🧠 Second Brain

> Your personal knowledge vault — save, organize, and share important links in one place.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Overview

**Second Brain** is a full-stack web application that lets users securely save, manage, and share their most important links and resources — all in one personal knowledge hub. Share your entire brain with others via a unique public link.

---



## ✨ Features

- 🔐 JWT-based user authentication (Signup & Signin)
- 🔗 Save and delete important links/content
- 🌐 Share your entire brain via a unique public hash link
- 🔒 Protected routes on both frontend and backend
- ☁️ Cloud-backed storage with MongoDB Atlas
- ⚡ REST API versioned at `/api/v1`
- 💤 Health check endpoint to keep the Render free-tier server alive via cron job

---

## 🛠️ Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Language  | TypeScript                           |
| Runtime   | Node.js                              |
| Framework | Express.js                           |
| Database  | MongoDB (Atlas) + Mongoose           |
| Auth      | JWT (JSON Web Tokens)                |
| Frontend  | React + Vite + Tailwind CSS          |
| Hosting   | Render (backend) + Vercel (frontend) |

---

## 📁 Project Structure

```
second-brain/
├── brainly-backend/
│   └── src/
│       ├── routes/
│       │   ├── signup.ts
│       │   ├── signin.ts
│       │   ├── postContent.ts
│       │   ├── getContent.ts
│       │   ├── deleteContent.ts
│       │   ├── shareContent.ts
│       │   └── contentLink.ts
│       ├── schema/          # Mongoose models/schemas
│       ├── validations/     # Input validation logic
│       ├── db.ts            # MongoDB connection
│       ├── middleware.ts    # JWT auth middleware
│       └── index.ts         # App entry point
│
├── brainly-frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── icons/           # SVG / icon components
│       ├── pages/
│       │   ├── LandingPage.tsx
│       │   ├── Signin.tsx
│       │   ├── Signup.tsx
│       │   ├── Dashboard.tsx
│       │   ├── SharedBrainPage.tsx
│       │   └── 404Handler.tsx
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
│
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend — create `.env` inside `brainly-backend/` using `.env.example` as a guide:

| Variable       | How to get it                                                              |
|----------------|----------------------------------------------------------------------------|
| `MONGO_URI`    | MongoDB Atlas → your cluster → Connect → Drivers → copy connection string  |
| `JWT_PASS`     | Any long random string — run: `openssl rand -hex 32`                       |
| `FRONTEND_URL` | `http://localhost:5173` for local, or your deployed Vercel URL             |

### Frontend — create `.env` inside `brainly-frontend/` using `.env.example` as a guide:

| Variable       | How to get it                                                              |
|----------------|----------------------------------------------------------------------------|
| `VITE_API_URL` | `http://localhost:3000` for local, or your deployed Render backend URL     |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.
> Copy `.env.example` → `.env` and fill in your own values.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/shubhamv-codes/second-brain.git
cd second-brain
```

### 2. Setup Backend

```bash
cd brainly-backend
cp .env.example .env      # then fill in your values
npm install
npm run dev
```

Server runs at **http://localhost:3000**

### 3. Setup Frontend

```bash
cd brainly-frontend
cp .env.example .env      # then fill in your values
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🔌 API Reference

Base URL: `http://localhost:3000/api/v1`

### Auth (Public)

| Method | Endpoint  | Description         |
|--------|-----------|---------------------|
| POST   | `/signup` | Register a new user |
| POST   | `/signin` | Login & receive JWT |

### Content (🔒 Protected)

> Requires `Authorization: Bearer <token>` header.

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| GET    | `/content` | Fetch all saved content  |
| POST   | `/content` | Save a new link/content  |
| DELETE | `/delete`  | Delete a content item    |

### Brain Sharing

| Method | Endpoint          | Description                               |
|--------|-------------------|-------------------------------------------|
| POST   | `/brain/share` 🔒 | Generate a shareable hash for your brain  |
| GET    | `/brain/:hash`    | View a shared brain (public)              |

### Health

| Method | Endpoint  | Description                            |
|--------|-----------|----------------------------------------|
| GET    | `/health` | Server health check (used by cron job) |

---

## 🌐 Deployment

| Service  | Platform      | URL                                       |
|----------|---------------|-------------------------------------------|
| Frontend | Vercel        | https://brain.shubhamvishwakarma.in       |
| Backend  | Render        | https://brainly-backendpower.onrender.com |
| Database | MongoDB Atlas | `second-brain` cluster                    |

> The backend exposes a `/health` endpoint pinged every 10 minutes by a cron job to prevent Render's free tier from spinning down.

---

## 🔒 Security

- Passwords are hashed before storage
- JWT tokens are used for stateless, secure authentication
- CORS is restricted to the configured `FRONTEND_URL`
- Auth middleware protects all private routes server-side
- Frontend uses a `PrivateRoute` guard — unauthenticated users are redirected to `/signin`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Shubham**
GitHub: [@shubhamv-codes](https://github.com/shubhamv-codes)

---

> _"Your mind is for having ideas, not holding them." — David Allen_
