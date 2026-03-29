# Clario Frontend

React + TypeScript single-page application for the Clario voice journaling platform.  
Built with **Vite**, **shadcn/ui**, **Tailwind CSS**, **Framer Motion**, and **TanStack React Query**.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install   # or: bun install

# Copy and fill in environment variables
cp .env.example .env

# Start the development server (http://localhost:8080)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run Vitest in watch mode |

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
VITE_BACKEND_BASE_URL=http://localhost:8000
```

---

## 📁 Source Structure

```
src/
├── pages/
│   ├── Index.tsx          # Landing page (hero, features, testimonials)
│   ├── Login.tsx          # Authentication (login / sign-up toggle)
│   ├── Dashboard.tsx      # Core journaling UI (mic, streaks, mood chart, history)
│   ├── Settings.tsx       # User preferences (name, notifications, reminder time)
│   ├── About.tsx          # About page
│   └── NotFound.tsx       # 404 fallback
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProtectedRoute.tsx # Redirects unauthenticated users to /login
│   └── ui/                # shadcn/ui component library
├── contexts/
│   └── AuthContext.tsx    # Supabase session & user state
├── hooks/
│   ├── useVoiceJournal.ts # Voice recording + backend WebSocket management
│   └── use-mobile.tsx     # Responsive breakpoint hook
└── lib/
    ├── supabase.ts        # Supabase JS client
    ├── gemini.ts          # WebSocket client + Web Audio API (PCM processing)
    ├── api.ts             # REST helpers for settings CRUD
    └── utils.ts           # General utilities
```

---

## 🎙️ Voice Journaling Flow

1. User clicks the microphone button on the Dashboard.
2. `useVoiceJournal` opens a WebSocket to `VITE_BACKEND_BASE_URL/websocket/gemini/live?token=<JWT>`.
3. `MediaHandler` (in `lib/gemini.ts`) captures browser audio via the Web Audio API, downsamples it to **16 kHz PCM Int16**, and sends it over the WebSocket.
4. The backend proxies audio to **Google Gemini Live** and streams the AI's audio response back.
5. `MediaHandler` decodes and plays the response audio in real time.

---

## 🎨 Design System

- **Primary font**: Cormorant Garamond (display headings)
- **Body font**: Karla (body text)
- **Color palette**: Warm sage / teal primary with an orange accent
- **Component library**: [shadcn/ui](https://ui.shadcn.com) (Radix UI + Tailwind)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

