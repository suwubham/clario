import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, User, Clock, Shield, Moon, Sun, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "ne", native: "नेपाली" },
];

const Settings = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("Jordan");
  const [email, setEmail] = useState("jordan@example.com");
  const [dailyReminder, setDailyReminder] = useState(true);
  const [streakNotifs, setStreakNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    i18n.changeLanguage(code);
    localStorage.setItem("clario-lang", code);
  };

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
            <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground">
              {t("settings.account")}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-4xl font-light text-foreground mt-1 mb-10">
              {t("settings.title_1")} <span className="italic">{t("settings.title_2")}</span>
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
              <h2 className="font-display text-lg font-semibold text-foreground">{t("settings.profile")}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                  {t("settings.name")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                  {t("settings.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
            </div>
          </motion.section>

          {/* Appearance — Dark mode + Language */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl bg-card border border-border/50 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              {isDark ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
              <h2 className="font-display text-lg font-semibold text-foreground">{t("settings.appearance")}</h2>
            </div>

            {/* Dark mode */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-body text-sm font-medium text-foreground">{t("settings.dark_mode")}</p>
                <p className="font-body text-xs text-muted-foreground">
                  {isDark ? t("settings.dark_mode_on") : t("settings.dark_mode_off")}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${
                  isDark ? "bg-primary" : "bg-border"
                }`}
                aria-label="Toggle dark mode"
              >
                <div className={`w-5 h-5 rounded-full shadow-sm absolute top-0.5 transition-all duration-300 flex items-center justify-center ${
                  isDark ? "translate-x-[22px] bg-primary-foreground" : "translate-x-0.5 bg-primary-foreground"
                }`}>
                  {isDark
                    ? <Moon className="w-2.5 h-2.5 text-primary" />
                    : <Sun className="w-2.5 h-2.5 text-muted-foreground" />}
                </div>
              </button>
            </div>

            {/* Language */}
            <div className="border-t border-border/40 mt-4 pt-4">
              <div className="flex items-start gap-2 mb-3">
                <Languages className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{t("settings.language")}</p>
                  <p className="font-body text-xs text-muted-foreground">{t("settings.language_desc")}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-4 py-2 rounded-xl font-body text-sm transition-all duration-200 border ${
                      currentLang === lang.code
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border/50 hover:border-primary/40"
                    }`}
                  >
                    {lang.native}
                  </button>
                ))}
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
              <h2 className="font-display text-lg font-semibold text-foreground">{t("settings.notifications")}</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: t("settings.daily_reminder"), desc: t("settings.daily_reminder_desc"), value: dailyReminder, setter: setDailyReminder },
                { label: t("settings.streak_notifs"), desc: t("settings.streak_notifs_desc"), value: streakNotifs, setter: setStreakNotifs },
                { label: t("settings.weekly_digest"), desc: t("settings.weekly_digest_desc"), value: weeklyDigest, setter: setWeeklyDigest },
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
              <h2 className="font-display text-lg font-semibold text-foreground">{t("settings.reminder_time")}</h2>
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
              <h2 className="font-display text-lg font-semibold text-foreground">{t("settings.privacy")}</h2>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {t("settings.privacy_desc")}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Settings;