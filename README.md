# Wubamlak Girum Portfolio

A modern, full-stack developer portfolio built to showcase projects, skills, and professional experience with a dynamic admin-managed content system.

## Overview

This application serves as a personal portfolio and content management platform. It features a polished dark-themed frontend with smooth animations and a RESTful backend API that powers all dynamic content including projects, skills, work experiences, contact messages, and resume management.

## Key Features

- Dynamic project showcase with detailed project pages, tech tags, and key feature highlights
- Skills management with category grouping and proficiency tracking
- Work experience timeline with role descriptions and date ranges
- Contact form with email notification support via Nodemailer
- Resume upload and download functionality
- Secure admin dashboard for full content management (JWT-protected)
- Responsive design optimized for desktop, tablet, and mobile
- Smooth animations and micro-interactions powered by Framer Motion
- State management with Redux Toolkit and RTK Query for efficient data fetching

## Tech Stack

- React 19
- Tailwind CSS v4
- Framer Motion
- Redux Toolkit with RTK Query
- React Router v7
- Node.js
- Express 5
- PostgreSQL with Sequelize ORM
- JWT authentication
- Multer, Bcrypt, and Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Installation

```
git clone https://github.com/Zwubman/portfolio.git
cd portfolio
```

### Backend Setup

```
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory and define the required values:

```ini
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

### Run the Backend

```
npm start
```

For development:

```
npm run dev
```

### Frontend Setup

```
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```ini
VITE_API_URL=http://localhost:5000/api
```

### Run the Frontend

```
npm run dev
```

For production build:

```
npm run build
```

## Available Scripts

### Backend

- `npm start` - start the API server
- `npm run dev` - run the server with nodemon

### Frontend

- `npm run dev` - start Vite dev server with HMR
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run Oxlint

## Project Structure

- `frontend/src/components/sections/` - HeroSection, AboutSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection
- `frontend/src/components/layout/` - Navbar, Footer
- `frontend/src/pages/` - Home, ProjectDetails, AdminDashboard, AdminLogin, NotFound
- `frontend/src/store/` - Redux store and RTK Query API slices
- `backend/controllers/` - request handlers for auth, projects, skills, experiences, contact, and resume
- `backend/models/` - Sequelize models for User, Project, Skill, Experience, and ContactMessage
- `backend/routes/` - API route definitions
- `backend/utils/` - seed scripts and shared helpers
- `backend/configs/` - database configuration

## Purpose

This portfolio is designed to present professional work in a clean, dynamic, and visually engaging format while giving full control over content through a secure admin interface backed by a robust API.
