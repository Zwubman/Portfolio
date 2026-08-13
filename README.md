# 🚀 Wubamlak Girum — Full-Stack Developer Portfolio

A modern, responsive, and fully dynamic developer portfolio built with **React 19**, **Tailwind CSS v4**, **Node.js / Express 5**, and **PostgreSQL**. Features a sleek dark-themed UI with smooth animations, an admin dashboard for content management, and a RESTful API backend.

🌐 **Live Site:** [wubamlakg.netlify.app](https://wubamlakg.netlify.app)

---

## ✨ Key Features

### Frontend
- **Modern Dark Theme UI** — Premium glassmorphism design with purple/fuchsia accent palette, smooth gradients, and micro-animations powered by Framer Motion
- **Responsive Layout** — Fully optimized for desktop, tablet, and mobile viewports
- **Dynamic Sections** — Hero, About, Skills, Projects, Experience, and Contact sections all driven by API data
- **Project Details Page** — Dedicated pages for each project with full descriptions, key features, tech tags, and action links
- **Admin Dashboard** — Secure admin panel for managing projects, skills, experiences, and contact messages (JWT-protected)
- **State Management** — Redux Toolkit with RTK Query for efficient data fetching and caching
- **SEO Optimized** — Proper meta tags, semantic HTML, and optimized performance

### Backend
- **RESTful API** — Clean, modular Express 5 API with organized routes, controllers, and models
- **Authentication** — Secure JWT-based admin authentication with bcrypt password hashing
- **Content Management** — Full CRUD operations for Projects, Skills, Experiences, and Contact Messages
- **File Uploads** — Multer-powered image and resume uploads with static file serving
- **Database** — PostgreSQL with Sequelize ORM, automatic migrations, and seed data
- **Email Notifications** — Nodemailer integration for contact form submissions
- **Health Check Endpoint** — `/api/health` for monitoring server status

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                    |
| ------------ | --------------------------------------------------------------- |
| **Frontend** | React 19, Tailwind CSS v4, Framer Motion, Redux Toolkit (RTK Query), React Router v7, Lucide Icons |
| **Backend**  | Node.js, Express 5, Sequelize ORM, JWT, Bcrypt, Multer, Nodemailer |
| **Database** | PostgreSQL                                                      |
| **Tooling**  | Vite 8, Oxlint, Nodemon                                        |
| **Hosting**  | Netlify (Frontend), Render / Railway (Backend)                  |

---

## 📁 Project Structure

```
my_portfolio/
├── frontend/                   # React + Vite frontend application
│   ├── public/                 # Static assets (favicon, images)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer
│   │   │   └── sections/       # HeroSection, AboutSection, SkillsSection,
│   │   │                       # ProjectsSection, ExperienceSection, ContactSection
│   │   ├── pages/              # Home, ProjectDetails, AdminDashboard, AdminLogin, NotFound
│   │   ├── store/              # Redux store, RTK Query API slices
│   │   └── App.jsx             # Root component with routing
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # Node.js + Express API server
│   ├── configs/                # Database configuration
│   ├── controllers/            # Auth, Project, Experience, Skill, Contact, Resume controllers
│   ├── models/                 # Sequelize models (User, Project, Experience, Skill, ContactMessage)
│   ├── routes/                 # Express route definitions
│   ├── utils/                  # Seed data, helpers
│   ├── uploads/                # Uploaded files (images, resume)
│   ├── server.js               # Application entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** >= 9.x

### 1. Clone the Repository

```bash
git clone https://github.com/Zwubman/portfolio.git
cd portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_NAME=portfolio_db
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

Start the backend server:

```bash
npm run dev          # Development (with nodemon)
npm start            # Production
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev          # Development (Vite HMR)
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 📡 API Endpoints

| Method   | Endpoint              | Description                  | Auth     |
| -------- | --------------------- | ---------------------------- | -------- |
| `POST`   | `/api/auth/login`     | Admin login                  | No       |
| `GET`    | `/api/projects`       | Get all projects             | No       |
| `POST`   | `/api/projects`       | Create a project             | JWT      |
| `PUT`    | `/api/projects/:id`   | Update a project             | JWT      |
| `DELETE` | `/api/projects/:id`   | Delete a project             | JWT      |
| `GET`    | `/api/skills`         | Get all skills               | No       |
| `POST`   | `/api/skills`         | Create a skill               | JWT      |
| `PUT`    | `/api/skills/:id`     | Update a skill               | JWT      |
| `DELETE` | `/api/skills/:id`     | Delete a skill               | JWT      |
| `GET`    | `/api/experiences`    | Get all experiences          | No       |
| `POST`   | `/api/experiences`    | Create an experience         | JWT      |
| `PUT`    | `/api/experiences/:id`| Update an experience         | JWT      |
| `DELETE` | `/api/experiences/:id`| Delete an experience         | JWT      |
| `POST`   | `/api/contact`        | Submit contact message       | No       |
| `GET`    | `/api/contact`        | Get all messages             | JWT      |
| `DELETE` | `/api/contact/:id`    | Delete a message             | JWT      |
| `GET`    | `/api/resume`         | Download resume              | No       |
| `POST`   | `/api/resume`         | Upload resume                | JWT      |
| `GET`    | `/api/health`         | Server health check          | No       |

---

## 🎨 Screenshots

> Visit the live site at [wubamlakg.netlify.app](https://wubamlakg.netlify.app) to see the portfolio in action.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Wubamlak Girum** — Full-Stack Software Engineer

- 🌐 [Portfolio](https://wubamlakg.netlify.app)
- 💻 [GitHub](https://github.com/Zwubman)

---

<p align="center">
  Built with ❤️ using React & Node.js
</p>
