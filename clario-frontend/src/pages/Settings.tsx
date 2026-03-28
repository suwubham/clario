import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, User, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Settings = () => {
  const [name, setName] = useState("Jordan");
  const [email, setEmail] = useState("jordan@example.com");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [streakNotifs, setStreakNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");

  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain-overlay" />
      <Navbar />

      <div className="pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground">Account</motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light text-foreground mt-1 mb-10">
              Your <span className="italic">settings</span>
            </motion.h1>
          </motion.div>

          {/* Profile */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-card border border-border/50 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-4 h-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border/50 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-4 h-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Daily reminder", desc: "Gentle nudge to journal each day", value: dailyReminder, setter: setDailyReminder },
                { label: "Streak notifications", desc: "Celebrate milestones and streaks", value: streakNotifs, setter: setStreakNotifs },
                { label: "Weekly digest", desc: "Summary of your week's reflections", value: weeklyDigest, setter: setWeeklyDigest },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{pref.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => pref.setter(!pref.value)}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                      pref.value ? "bg-primary" : "bg-border"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-primary-foreground shadow-sm absolute top-0.5 transition-transform duration-200 ${
                      pref.value ? "translate-x-[22px]" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Reminder Time */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-card border border-border/50 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-4 h-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Reminder Time</h2>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
            />
          </motion.section>

          {/* Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-4 h-4 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Privacy</h2>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Your voice recordings are processed on-device and never stored in readable form. 
              Only anonymized mood data is used to generate insights. You can request full data deletion at any time.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
