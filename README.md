# CipherSQLStudio 🚀

**CipherSQLStudio** is a premium, browser-based SQL learning platform. It allows users to master SQL by practicing against real-world datasets with real-time feedback, intelligent AI hints, and persistent progress tracking.

---

## 🔗 Live Links
- **Production URL**: [https://sql-practice-studio.vercel.app/](https://sql-practice-studio.vercel.app/)
- **Backend API**: [https://sql-practice-studio.onrender.com](https://sql-practice-studio.onrender.com)
- **GitHub Repo**: [https://github.com/Sanket-Pandit-Patil/sql-practice-studio](https://github.com/Sanket-Pandit-Patil/sql-practice-studio)

---

## ✨ Key Features

### 🔐 Secure Authentication & Access Control
- **Mandatory Login**: Content is protected; users must sign up or log in to access assignments.
- **Join the Studio**: A beautiful, glassmorphism-inspired onboarding experience.
- **JWT-Powered**: Secure session management using JSON Web Tokens.

### 📝 Interactive SQL Workspace
- **Monaco Editor**: High-end code editor with SQL syntax highlighting (VS Code style).
- **Execution History**: Automatically saves your last 5 query attempts (success/error) per assignment.
- **History Reload**: Click any past attempt to instantly reload it into the editor.

### 💡 Intelligent AI Tutoring
- **Gemini AI Integration**: Get conceptual hints when you're stuck without having the solution spoiled.
- **Context-Aware**: The AI understands your current query and specific PostgreSQL errors.

### 🛡 Sandbox Environment
- **Security First**: Middleware enforces read-only access, blocking `DROP`, `DELETE`, `UPDATE`, etc.
- **PostgreSQL Sandbox**: Run complex queries, joins, and CTEs against a real database.

---

## 🛠 Tech Stack

- **Frontend**: React.js (Vite), Context API, Axios, Monaco Editor, Vanilla SCSS.
- **Backend**: Node.js, Express.js.
- **Database (Meta)**: MongoDB Atlas (Assignments & User Data).
- **Database (Sandbox)**: PostgreSQL (Neon Cloud).
- **Security**: Bcrypt.js (Hashing), JWT (Auth Middleware).
- **LLM**: Google Gemini 2.5 Flash.

---

## 📦 Project Structure

```text
sql-practice-studio/
├── backend/
│   ├── src/
│   │   ├── middleware/   # JWT Auth & SQL Sandbox security
│   │   ├── models/       # Mongoose (User, Assignment, Attempt)
│   │   ├── routes/       # Auth, Assignments, Execution, History
│   │   └── services/     # Gemini AI Integration
├── frontend/
│   ├── src/
│   │   ├── context/      # AuthState Management
│   │   ├── components/   # ProtectedRoute, Navbar, Editors
│   │   ├── pages/        # Login, Signup, Workspace, Listing
│   │   └── styles/       # Premium SCSS (Glassmorphism, BEM)
```

---

## ⚙️ Setup Instructions

### 1. Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file from the following template:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   PG_HOST=your_postgress_host
   PG_USER=your_user
   PG_PASSWORD=your_password
   PG_DATABASE=your_db_name
   JWT_SECRET=your_super_secret_key
   GEMINI_API_KEY=your_gemini_key
   CORS_ORIGIN=https://sql-practice-studio.vercel.app
   ```
4. Start server: `npm run dev`.

### 2. Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Configure `.env`:
   ```env
   VITE_API_BASE_URL=https://sql-practice-studio.onrender.com/api
   ```
4. Start dev server: `npm run dev`.

---

## 🛡 Security Strategy

The platform implements a **Strict Read-Only Enforcement**:
- **Regex Blocking**: Prevents any modification queries (`INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`).
- **Timeout Protection**: Queries are terminated after 5 seconds to prevent memory leaks.
- **Multiple Statement Guard**: Semicolons are monitored to prevent SQL injection.

---

## 📊 Status & Data
- **Hosting**: Vercel (Frontend) + Render (Backend).
- **Bugs**: No known critical regressions.
- **License**: MIT.

Created with ❤️ by **Sanket Patil**
