import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Flame, TrendingUp, Sparkles, ArrowRight, BookOpen, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const getGreetingKey = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "good_morning";
  if (hour < 17) return "good_afternoon";
  return "good_evening";
};

const getFirstName = (fullName: string) => fullName.split(" ")[0];

// ─── NEW USER HOME ───────────────────────────────────────────
const NewUserHome = ({ firstName }: { firstName: string | null }) => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Mic,
      title: t("home.new.step1_title"),
      desc: t("home.new.step1_desc"),
    },
    {
      icon: Sparkles,
      title: t("home.new.step2_title"),
      desc: t("home.new.step2_desc"),
    },
    {
      icon: TrendingUp,
      title: t("home.new.step3_title"),
      desc: t("home.new.step3_desc"),
    },
  ];

  return (
    <div className="pt-28 pb-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">

        {/* Welcome heading */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12 text-center">
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground uppercase tracking-widest mb-3">
            {t("home.new.badge")}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl font-light text-foreground">
            {firstName
              ? <>{t("home.new.title_hello")} <span className="italic text-primary">{firstName}</span>!</>
              : <>{t("home.new.title_generic")}</>
            }
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-base text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            {t("home.new.subtitle")}
          </motion.p>
        </motion.div>

        {/* How it works — 3 steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {t("home.new.step")} {i + 1}
              </p>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-2xl bg-card border border-border/50 text-center"
          style={{ background: "var(--gradient-warm)" }}
        >
          <Star className="w-8 h-8 text-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl font-light text-foreground mb-2">
            {t("home.new.cta_title")}
          </h2>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            {t("home.new.cta_desc")}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity duration-200"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Mic className="w-4 h-4" />
            {t("home.new.cta_btn")}
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

// ─── RETURNING USER HOME ─────────────────────────────────────
const ReturningUserHome = ({ firstName }: { firstName: string | null }) => {
  const { t } = useTranslation();

  const quickStats = [
    { label: t("home.streak"), value: "12", sub: t("home.personal_best"), icon: Flame, color: "text-accent" },
    { label: t("home.mood_today"), value: "8.2", sub: t("home.from_yesterday"), icon: TrendingUp, color: "text-primary" },
    { label: t("home.sessions"), value: "47", sub: t("home.total_sessions"), icon: Sparkles, color: "text-primary" },
  ];

  return (
    <div className="pt-28 pb-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">

        {/* Greeting */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12">
          <motion.p variants={fadeUp} className="font-body text-sm text-muted-foreground">
            {t(`home.${getGreetingKey()}`)}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl md:text-5xl font-light text-foreground mt-2">
            {firstName
              ? <>{t("home.title_hello")} <span className="italic text-primary">{firstName}</span></>
              : <>{t("home.title_1")} <span className="italic text-primary">{t("home.title_2")}</span></>
            }
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-base text-muted-foreground mt-4 max-w-lg leading-relaxed">
            {t("home.subtitle")}
          </motion.p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className="font-display text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Start reflection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-2xl bg-card border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6 mb-6"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div>
            <h2 className="font-display text-2xl font-light text-foreground">
              {t("home.cta_title_1")} <span className="italic text-primary">{t("home.cta_title_2")}</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">{t("home.cta_desc")}</p>
          </div>
          <Link
            to="/dashboard"
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity duration-200"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Mic className="w-4 h-4" />
            {t("home.cta_btn")}
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link to="/dashboard" className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-primary" />
                <p className="font-display text-lg font-semibold text-foreground">{t("home.go_journal")}</p>
              </div>
              <p className="font-body text-xs text-muted-foreground">{t("home.go_journal_desc")}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </Link>
          <Link to="/settings" className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="font-display text-lg font-semibold text-foreground">{t("home.go_settings")}</p>
              </div>
              <p className="font-body text-xs text-muted-foreground">{t("home.go_settings_desc")}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

// ─── MAIN HOME ───────────────────────────────────────────────
const Home = () => {
  const { isNewUser, user } = useAuth();
  const firstName = user?.fullName ? getFirstName(user.fullName) : null;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain-overlay" />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <Navbar />
      {isNewUser
        ? <NewUserHome firstName={firstName} />
        : <ReturningUserHome firstName={firstName} />
      }
    </div>
  );
};

export default Home;