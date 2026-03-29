import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Flame, TrendingUp, Sun, Cloud, CloudRain, Sparkles, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import { useVoiceJournal } from "@/hooks/useVoiceJournal";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const moodData = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 7 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 8 },
  { day: "Fri", mood: 7 },
  { day: "Sat", mood: 9 },
  { day: "Sun", mood: 8 },
];

const pastSessions = [
  { date: "Mar 27", mood: 8, moodIcon: Sun, streak: 12 },
  { date: "Mar 26", mood: 7, moodIcon: Sun, streak: 11 },
  { date: "Mar 25", mood: 5, moodIcon: Cloud, streak: 10 },
  { date: "Mar 24", mood: 6, moodIcon: CloudRain, streak: 9 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── NEW USER DASHBOARD ──────────────────────────────────────
const NewUserDashboard = ({ startSession, endSession, isRecording }: {
  startSession: () => void;
  endSession: () => void;
  isRecording: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div className="pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground">
            {t("dashboard.greeting")}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light text-foreground mt-1">
            {t("dashboard.title_1")} <span className="italic">{t("dashboard.title_2")}</span>
          </motion.h1>
        </motion.div>

        {/* First reflection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-10 rounded-2xl bg-card border border-border/50 flex flex-col items-center justify-center text-center min-h-[320px] relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative z-10">
            <Star className="w-10 h-10 text-accent mx-auto mb-5" />
            <h2 className="font-display text-2xl font-light text-foreground mb-3">
              {t("dashboard.new.cta_title")}
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
              {t("dashboard.new.cta_desc")}
            </p>
            <button
              onClick={startSession}
              className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-200 mx-auto"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <Mic className="w-5 h-5" />
              {t("dashboard.new.btn")}
            </button>
          </div>
        </motion.div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Mic, label: t("dashboard.new.tip1_title"), desc: t("dashboard.new.tip1_desc") },
            { icon: Sparkles, label: t("dashboard.new.tip2_title"), desc: t("dashboard.new.tip2_desc") },
            { icon: TrendingUp, label: t("dashboard.new.tip3_title"), desc: t("dashboard.new.tip3_desc") },
          ].map((tip, i) => (
            <motion.div
              key={tip.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="p-5 rounded-2xl bg-card border border-border/50 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                <tip.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display text-base font-semibold text-foreground mb-1">{tip.label}</p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recording Overlay */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between py-16 px-6"
            >
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
              <div className="relative z-10 text-center mt-12 w-full max-w-md mx-auto">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                  <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">{t("dashboard.active_reflection")}</p>
                  <h2 className="font-display text-4xl text-foreground">{t("dashboard.listening")}</h2>
                </motion.div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-accent/40" />
                  <div className="w-32 h-32 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-2xl relative z-10">
                    <Mic className="w-12 h-12" />
                  </div>
                </div>
              </div>
              <div className="relative z-10 pb-8 flex flex-col items-center">
                <button onClick={endSession} className="w-20 h-20 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg flex items-center justify-center group">
                  <MicOff className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
                <p className="font-body text-sm text-muted-foreground mt-4">{t("dashboard.end_session")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── RETURNING USER DASHBOARD ────────────────────────────────
const ReturningUserDashboard = ({ startSession, endSession, isRecording }: {
  startSession: () => void;
  endSession: () => void;
  isRecording: boolean;
}) => {
  const { t } = useTranslation();
  const currentStreak = 12;

  return (
    <div className="pt-28 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground">
            {t("dashboard.greeting")}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light text-foreground mt-1">
            {t("dashboard.title_1")} <span className="italic">{t("dashboard.title_2")}</span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Session Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-8 rounded-2xl bg-card border border-border/50 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-glow)" }} />
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                {t("dashboard.ready")}
              </p>
              <button
                onClick={startSession}
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 my-2"
              >
                <Mic className="w-8 h-8" />
              </button>
              <p className="font-body text-sm text-muted-foreground mt-4">{t("dashboard.tap_to_start")}</p>
            </div>
          </motion.div>

          {/* Streak Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border/50 flex flex-col items-center justify-center text-center"
          >
            <div className="relative mb-4">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={264}
                  strokeDashoffset={264 - (264 * Math.min(currentStreak, 30) / 30)}
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (264 * Math.min(currentStreak, 30) / 30) }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-6 h-6 text-accent" />
              </div>
            </div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="font-display text-4xl font-semibold text-foreground">
              {currentStreak}
            </motion.span>
            <p className="font-body text-xs text-muted-foreground mt-1">{t("dashboard.day_streak")}</p>
            <p className="font-body text-xs text-primary mt-2">{t("dashboard.personal_best")}</p>
          </motion.div>
        </div>

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-8 rounded-2xl bg-card border border-border/50"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="font-display text-xl font-semibold text-foreground">{t("dashboard.summary_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-background border border-border/30">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("dashboard.mood_score")}</p>
              <p className="font-display text-3xl font-semibold text-primary">8.2</p>
              <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" /> {t("dashboard.from_yesterday")}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border/30">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("dashboard.key_events")}</p>
              <ul className="space-y-1">
                <li className="font-body text-sm text-foreground/80">{t("dashboard.events.walk")}</li>
                <li className="font-body text-sm text-foreground/80">{t("dashboard.events.convo")}</li>
                <li className="font-body text-sm text-foreground/80">{t("dashboard.events.milestone")}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border/30">
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("dashboard.insight_label")}</p>
              <p className="font-body text-sm text-foreground/80 leading-relaxed italic">{t("dashboard.insight")}</p>
            </div>
          </div>
        </motion.div>

        {/* Mood Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-8 rounded-2xl bg-card border border-border/50"
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">{t("dashboard.mood_trends")}</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(30 8% 50%)" }} />
                <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(30 8% 50%)" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }} />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Past Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t("dashboard.past_sessions")}</h2>
          <div className="space-y-3">
            {pastSessions.map((session, i) => (
              <motion.div
                key={session.date}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <session.moodIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-body text-sm font-medium text-foreground">{session.date}</span>
                    <span className="font-body text-xs text-muted-foreground">{t("dashboard.mood_label")} {session.mood}/10</span>
                    <span className="font-body text-xs text-accent flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {session.streak}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recording Overlay */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between py-16 px-6"
            >
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
              <div className="relative z-10 text-center mt-12 w-full max-w-md mx-auto">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                  <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-2">{t("dashboard.active_reflection")}</p>
                  <h2 className="font-display text-4xl text-foreground">{t("dashboard.listening")}</h2>
                </motion.div>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-accent/40" />
                  <div className="w-32 h-32 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-2xl relative z-10">
                    <Mic className="w-12 h-12" />
                  </div>
                </div>
              </div>
              <div className="relative z-10 pb-8 flex flex-col items-center">
                <button onClick={endSession} className="w-20 h-20 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg flex items-center justify-center group">
                  <MicOff className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
                <p className="font-body text-sm text-muted-foreground mt-4">{t("dashboard.end_session")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD ──────────────────────────────────────────
const Dashboard = () => {
  const { isNewUser } = useAuth();
  const { isRecording, startSession, endSession } = useVoiceJournal();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain-overlay" />
      <Navbar />
      {isNewUser
        ? <NewUserDashboard startSession={startSession} endSession={endSession} isRecording={isRecording} />
        : <ReturningUserDashboard startSession={startSession} endSession={endSession} isRecording={isRecording} />
      }
    </div>
  );
};

export default Dashboard;