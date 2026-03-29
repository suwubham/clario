# Clario Backend

FastAPI backend for the Clario voice journaling platform.  
Handles real-time voice sessions via **Google Gemini Live API** over WebSockets, user settings persistence via **Supabase**, and JWT-based authentication.

---

## 🚀 Getting Started

### Prerequisites

- Python ≥ 3.11
- [`uv`](https://docs.astral.sh/uv/) (fast Python package manager)

### Setup

```bash
# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
uv sync

# Copy and fill in environment variables
cp .env.example .env

# Start the development server (http://localhost:8000)
uv run run.py
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
# Use the service_role secret (not anon) so the backend can bypass RLS for writes
SUPABASE_SECRET_KEY=your-service-role-secret

GEMINI_API_KEY=your-gemini-api-key
```

---

## 📡 API Reference

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/` | — | Health check |
| `WebSocket` | `/websocket/gemini/live?token=<JWT>` | JWT (query param) | Real-time Gemini Live voice session |
| `GET` | `/auth/me` | Bearer JWT | Current user info |
| `GET` | `/settings` | Bearer JWT | Fetch user settings |
| `PATCH` | `/settings` | Bearer JWT | Update user settings |

---

## 📁 Source Structure

```
app/
├── ai/
│   └── prompts/
│       └── base_agent.md      # Gemini system prompt (persona, tone, guidelines)
├── core/
│   ├── config.py              # Pydantic settings (loads .env)
│   ├── auth.py                # JWT verification dependency
│   └── supabase.py            # Supabase PostgREST HTTP client
├── routers/
│   ├── websocket.py           # WebSocket endpoint — bridges client ↔ Gemini Live
│   ├── auth.py                # GET /auth/me
│   └── settings.py            # GET & PATCH /settings
├── schema/
│   ├── response.py            # Generic ApiResponse[T] wrapper
│   └── settings.py            # SettingsData & SettingsUpdate Pydantic models
├── services/
│   ├── gemini_live.py         # GeminiLive class — manages Gemini Live session
│   └── settings.py            # Settings CRUD (wraps PostgREST)
└── main.py                    # FastAPI app, CORS, router registration
```

---

## 🎙️ Real-Time Voice Architecture

```
Browser  ──► WebSocket ──► FastAPI (websocket.py)
                               │
                               ├─► GeminiLive.send_audio()  ──► Gemini Live API
                               │                            ◄──
                               └─► WebSocket (audio back to browser)
```

1. The client opens a WebSocket with a Supabase **JWT** as a query parameter.
2. `websocket.py` verifies the token, then creates a `GeminiLive` session.
3. `GeminiLive` (in `services/gemini_live.py`) manages async input/output queues:
   - **Input queues**: audio, video (future), text
   - **Output**: audio chunks streamed back to the browser as base64-encoded bytes
4. On disconnect, tasks are cleanly cancelled and the Gemini session is closed.

---

## 🤖 AI Agent Configuration

The system prompt is loaded from `app/ai/prompts/base_agent.md`. Key characteristics:

- **Persona**: Friendly, humorous, casual — like journaling with a good friend
- **Language**: English or Nepali (user's choice)
- **Interaction style**: Story-driven reflection (no numeric mood scales)
- **Streak support**: Playful commentary to celebrate consistency
- **Guardrails**: No medical advice or mental health diagnosis

