# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform designed for students to practice SQL queries against pre-configured datasets with real-time feedback and intelligent, LLM-powered hints.

## 🚀 Features

- **Assignment Listing**: Browse SQL challenges by difficulty.
- **Interactive Workspace**: Write SQL in a Monaco-based editor (VS Code style).
- **Real-time Execution**: Run queries against a PostgreSQL sandbox and see formatted results instantly.
- **Intelligent Hints**: Get conceptual guidance from Google Gemini AI without revealing the full solution.
- **Security**: Built-in protection against destructive SQL operations (read-only enforcement).
- **Responsive Design**: Mobile-first UI built with vanilla SCSS.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Monaco Editor, Vanilla SCSS (BEM convention).
- **Backend**: Node.js, Express.js.
- **Database (Persistence)**: MongoDB Atlas (stored assignment metadata).
- **Database (Sandbox)**: PostgreSQL (executes student queries).
- **LLM Integration**: Google Gemini API.

## 📦 Project Structure

```text
ciphersqlstudio/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Route logic
│   │   ├── db/           # Database connections (PG & Mongo)
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # LLM (Gemini) integration
│   │   └── seed.js       # Initial assignment data
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI parts
    │   ├── pages/        # Main route components
    │   ├── services/     # API client (Axios)
    │   └── styles/       # Modular SCSS structure
    └── .env.example
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed.
- MongoDB Atlas cluster URL.
- PostgreSQL local or cloud instance.
- Google Gemini API Key.

### 1. Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env` and fill in your credentials.
4. (Optional) Seed initial data: `node src/seed.js`.
5. Start server: `npm start` (or `npm run dev` if nodemon is installed).

### 2. Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env` and configure `VITE_API_BASE_URL`.
4. Start development server: `npm run dev`.

## 🛡 Security & Query Validation

The platform implements a strict **read-only sandbox strategy**:
- **Blacklist**: Commands like `DELETE`, `DROP`, `TRUNCATE`, `INSERT`, `UPDATE` are blocked via middleware using regex and case-normalized checks.
- **Whitelist**: Only queries starting with `SELECT` or `WITH` (for CTEs) are permitted.
- **Timeout**: PostgreSQL sessions are restricted with a `statement_timeout` of 5 seconds to prevent resource exhaustion from heavy queries.
- **Multiple Statements**: The backend rejects queries containing semicolons that lead to multiple execution blocks.

## 💡 LLM Hint Engineering

Hints are generated using the **Gemini 1.5 Flash** model. The system prompt is engineered to:
- Conceptualize errors instead of fixing them.
- Refer to specific columns/tables without writing the full query.
- Use a "Tutor Mode" that provides at most 3 bullet points of guidance.

---

## 📊 Data-Flow Diagram (Instructions)

*Note: Per assignment requirements, this diagram must be hand-drawn. Below are the steps you must label:*

### Execute Query Flow
1. **User Input**: Student types SQL in Monaco Editor (Frontend state update).
2. **Action Trigger**: User clicks "Execute Query" (Loading state activated).
3. **API Request**: Frontend sends `POST /api/execute` with `{ query, assignmentId }`.
4. **Validation Middleware**: Backend checks for destructive keywords (Security Guard).
5. **Sandbox Execution**: Backend sets timeout and runs query via PostgreSQL pool.
6. **API Response**: Backend returns `JSON { columns, rows, rowCount }` or `{ error }`.
7. **UI Update**: Frontend updates result state and renders the `ExecutionResults` table.

### Hint Generation Flow
1. **Action Trigger**: User clicks "Get Hint" button.
2. **API Request**: Frontend sends `POST /api/execute/hint` with query and current error.
3. **Context Enrichment**: Backend fetches table schemas for accuracy.
4. **LLM Call**: Backend prompts Gemini API with "Tutor" instructions (Concept-only).
5. **Output Filter**: Backend verifies response doesn't contain full SELECT queries.
6. **Display**: Frontend shows the hint in a specialized UI box.
