import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, BarChart3, Flame, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const features = [
  {
    icon: Mic,
    title: "10–15 Min Voice Journaling",
    description: "Speak freely. Clario listens, transcribes, and gently guides your reflection.",
  },
  {
    icon: Sparkles,
    title: "Daily Insights",
    description: "Receive personalized observations about your patterns, growth, and emotional themes.",
  },
  {
    icon: Flame,
    title: "Streak Tracking",
    description: "Build consistency with gentle nudges and milestone celebrations.",
  },
  {
    icon: BarChart3,
    title: "Mood & Emotion Trends",
    description: "Visualize your emotional landscape over days, weeks, and months.",
  },
];

const testimonials = [
  {
    quote: "Clario helped me notice patterns I'd been blind to for years. It's like having a wise friend who just listens.",
    name: "Sarah M.",
    role: "Therapist",
  },
  {
    quote: "The voice-first approach removes all friction. I journal every morning now — 47 day streak and counting.",
    name: "David K.",
    role: "Software Engineer",
  },
  {
    quote: "I finally understand my moods. The insights are thoughtful, never generic. This is what AI should be.",
    name: "Elena R.",
    role: "Graduate Student",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain-overlay" />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "var(--gradient-glow)" }}
          aria-hidden
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Voice-First AI Journal
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl font-light leading-[0.95] text-foreground text-balance"
            >
              Clarity through
              <br />
              <span className="font-semibold italic text-primary">reflection</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-lg text-muted-foreground max-w-md leading-relaxed">
              Speak your thoughts. Clario listens, understands, and reveals the patterns beneath — helping you build emotional awareness, one day at a time.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg"
              >
                <Mic className="w-4 h-4" />
                Start Your Daily Reflection
              </Link>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Abstract zen landscape evoking calm and reflection"
                width={1280}
                height={720}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-accent/20 float" />
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-primary/10 float" style={{ animationDelay: "2s" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-4">How it works</p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              A gentler way to <span className="italic">know yourself</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-accent mb-4">Voices</p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground">
              What people are <span className="italic">feeling</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-6 rounded-2xl bg-background border border-border/30"
              >
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <footer className="font-body text-xs text-muted-foreground">
                  <strong className="text-foreground font-medium">{t.name}</strong> · {t.role}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
