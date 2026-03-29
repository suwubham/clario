# Clario — Voice-First AI Journaling

Clario is a **voice-first AI journaling application** powered by [Google's Gemini Live API](https://ai.google.dev/gemini-api/docs/live). Users reflect on their day through a natural, real-time voice conversation with an AI companion. The app tracks mood patterns, maintains streaks, and provides daily summaries — all without typing a single word.

---

## ✨ Features

- 🎙️ **Live Voice Journaling** – Speak naturally; Gemini transcribes, responds, and guides the session in real time via WebSocket streaming.
- 🤖 **Friendly AI Companion** – Clario (the AI agent) is casual, humorous, and curious — like journaling with a good friend. It supports both **English and Nepali**.
- 📊 **Mood Trends** – Interactive charts visualise how your emotional landscape shifts over time.
- 🔥 **Streak Tracking** – Visual progress indicator and gamified streak counter encourage daily consistency.
- 📓 **Past Sessions** – Browse previous journal entries with mood summaries and key event highlights.
- ⚙️ **User Settings** – Configure display name, daily reminder time, notification preferences, and more.
- 🔐 **Supabase Auth** – Secure email/password authentication with JWT-based API authorization.

---

## 🏗️ Architecture

```
clario/
├── clario-frontend/   # React + TypeScript SPA (Vite)
└── clario-backend/    # Python FastAPI server with WebSocket & Gemini Live
```

### How it fits together

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  React SPA  ──── HTTPS REST ────►  FastAPI  ──► Supabase DB │
│             ◄──── WebSocket ────►  FastAPI  ──► Gemini Live  │
│             ◄─────────────────────── Supabase Auth (JWT)     │
└──────────────────────────────────────────────────────────────┘
```

1. The user opens the React app and logs in with **Supabase Auth**.
2. Clicking the microphone starts a **WebSocket** session with the FastAPI backend.
3. The backend proxies real-time audio to **Google Gemini Live**, and streams the AI's audio response back to the browser.
4. At the end of each session, a summary (mood, highlights, insights) is persisted to **Supabase PostgreSQL**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript (Vite) |
| UI components | shadcn/ui (Radix UI primitives) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Forms & validation | React Hook Form + Zod |
| Data fetching | TanStack React Query |
| Routing | React Router v6 |
| Backend framework | FastAPI (Python 3.11+) |
| AI | Google GenAI SDK — Gemini Live API |
| Database & Auth | Supabase (PostgreSQL + RLS + Auth) |
| Package manager (Python) | `uv` |
| Package manager (JS) | Bun / npm |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (or [Bun](https://bun.sh))
- **Python** ≥ 3.11
- [`uv`](https://docs.astral.sh/uv/) Python package manager
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/suwubham/clario.git
cd clario
```

### 2. Set up the database

Run the SQL migration in your Supabase SQL Editor:

```bash
# File: clario-backend/supabase/sql/user_settings.sql
```

This creates the `user_settings` table with Row-Level Security policies.

### 3. Backend

```bash
cd clario-backend

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
uv sync

# Configure environment variables
cp .env.example .env
# Edit .env and fill in SUPABASE_URL, SUPABASE_SECRET_KEY, GEMINI_API_KEY

# Start the development server (default: http://localhost:8000)
uv run run.py
```

See [clario-backend/README.md](./clario-backend/README.md) for more details.

### 4. Frontend

```bash
cd clario-frontend

# Install dependencies
npm install   # or: bun install

# Configure environment variables
cp .env.example .env
# Edit .env and fill in VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_BACKEND_BASE_URL

# Start the development server (default: http://localhost:8080)
npm run dev
```

See [clario-frontend/README.md](./clario-frontend/README.md) for more details.

---

## 📁 Project Structure

```
clario/
├── clario-backend/
│   ├── app/
│   │   ├── ai/prompts/base_agent.md   # Gemini system prompt
│   │   ├── core/                      # Config, auth, Supabase client
│   │   ├── routers/                   # API routes (auth, settings, websocket)
│   │   ├── schema/                    # Pydantic request/response models
│   │   ├── services/                  # Business logic (settings, Gemini Live)
│   │   └── main.py                    # FastAPI app entrypoint
│   ├── supabase/sql/                  # Database migrations
│   ├── pyproject.toml
│   └── run.py
└── clario-frontend/
    ├── src/
    │   ├── pages/                     # Route-level components
    │   ├── components/                # Shared UI components (+ shadcn/ui)
    │   ├── hooks/                     # Custom React hooks
    │   ├── contexts/                  # Auth context provider
    │   └── lib/                       # Supabase client, Gemini WS, API utils
    ├── index.html
    └── package.json
```

---

## 🔑 Environment Variables

### Backend (`clario-backend/.env`)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SECRET_KEY` | Supabase **service_role** key (bypasses RLS for backend writes) |
| `GEMINI_API_KEY` | Google AI Studio API key |

### Frontend (`clario-frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase **anon** (public) key |
| `VITE_BACKEND_BASE_URL` | FastAPI backend URL (e.g., `http://localhost:8000`) |

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "feat: add your feature"`.
4. Push and open a pull request.

---

## 📄 License

This project is open source. See individual sub-directories for any additional licensing information.
