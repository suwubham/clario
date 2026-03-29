import { supabase } from "@/lib/supabase";

const BASE = import.meta.env.VITE_BACKEND_BASE_URL as string;

async function authHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.access_token ?? ""}`,
  };
}

// ── Settings ──────────────────────────────────────────────────────────────────

export interface SettingsData {
  user_id: string;
  name: string;
  email: string;
  daily_reminder: boolean;
  streak_notifications: boolean;
  weekly_digest: boolean;
  reminder_time: string;
  updated_at: string;
}

export interface SettingsUpdate {
  name?: string;
  daily_reminder?: boolean;
  streak_notifications?: boolean;
  weekly_digest?: boolean;
  reminder_time?: string;
}

export async function getSettings(): Promise<SettingsData> {
  const res = await fetch(`${BASE}/settings`, { headers: await authHeaders() });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to load settings");
  return json.data as SettingsData;
}

export async function patchSettings(updates: SettingsUpdate): Promise<SettingsData> {
  const res = await fetch(`${BASE}/settings`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify(updates),
  });
  const json = await res.json();
  if (!json.success) {
    const firstError = json.errors?.[0];
    throw new Error(firstError?.detail ?? json.message ?? "Failed to save settings");
  }
  return json.data as SettingsData;
}

// ── Voice sessions ────────────────────────────────────────────────────────────

export interface VoiceSessionStart {
  session_id: string;
  user_id: string;
  created_at: string;
}

export async function startVoiceSession(): Promise<VoiceSessionStart> {
  const res = await fetch(`${BASE}/sessions/start`, {
    method: "POST",
    headers: await authHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to start session");
  return json.data as VoiceSessionStart;
}

export type MoodLabel =
  | "anxious"
  | "calm"
  | "hopeful"
  | "reflective"
  | "frustrated"
  | "overwhelmed"
  | "grateful"
  | "sad"
  | "excited"
  | "angry"
  | "disappointed"
  | "happy"
  | "surprised"
  | "confused"
  | "bored"
  | "neutral";


export interface CallReportMoodPoint {
  score: number;
  label: MoodLabel;
}

export interface CallReportTheme {
  label: string;
  summary: string;
}

/** First-person journal lines; `label` may exist on older saved reports */
export interface CallReportThing {
  narrative: string;
  label?: string;
  category: "work" | "social" | "health" | "personal" | "other";
  sentiment: "positive" | "neutral" | "negative";
}

export interface CallReportInsight {
  type: "pattern" | "moment" | "suggestion";
  body: string;
}

/** Structured call report + session metrics (nested in SessionDetailData.report) */
export interface CallReportData {
  session_id: string;
  duration_seconds: number;
  user_words_spoken: number;
  /** Exactly three sentences — mental-health journaling tone */
  session_overview: [string, string, string];
  one_word_summary: string;
  average_mood_rating: number;
  energy_level: number;
  mood_across_session: CallReportMoodPoint[];
  themes_discussed: CallReportTheme[];
  things_you_did_today: CallReportThing[];
  gratitude: string[];
  insights: CallReportInsight[];
  suggestions: string[];
  /** Full first-person journal reflection (several paragraphs); may be empty on legacy saves */
  personal_reflection?: string;
}

export interface ConversationTurn {
  role: string;
  message: string;
  created_at: string;
}

/** GET /sessions/:id and POST /sessions/:id/report */
export interface SessionDetailData {
  session_id: string;
  user_id: string;
  created_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  report: CallReportData | null;
  conversation: ConversationTurn[];
}

export async function listSessions(params?: {
  date?: string;
  tzOffsetMinutes?: number;
}): Promise<SessionDetailData[]> {
  const search = new URLSearchParams();
  if (params?.date) search.set("date", params.date);
  if (typeof params?.tzOffsetMinutes === "number") {
    search.set("tz_offset_minutes", String(params.tzOffsetMinutes));
  }

  const qs = search.toString();
  const res = await fetch(`${BASE}/sessions${qs ? `?${qs}` : ""}`, {
    headers: await authHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to load sessions");
  return json.data as SessionDetailData[];
}

export async function getSession(sessionId: string): Promise<SessionDetailData> {
  const res = await fetch(`${BASE}/sessions/${encodeURIComponent(sessionId)}`, {
    headers: await authHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to load session");
  return json.data as SessionDetailData;
}

export async function generateSessionReport(sessionId: string): Promise<SessionDetailData> {
  const res = await fetch(`${BASE}/sessions/${encodeURIComponent(sessionId)}/report`, {
    method: "POST",
    headers: await authHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message ?? "Failed to generate report");
  return json.data as SessionDetailData;
}
