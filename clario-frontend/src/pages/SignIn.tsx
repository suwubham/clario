import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-6">
      <div className="grain-overlay" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <Link to="/" className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Clario
          </Link>
          <p className="font-body text-sm text-muted-foreground mt-2">
            {t("signin.subtitle")}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          className="p-8 rounded-2xl bg-card border border-border/50"
        >
          <h1 className="font-display text-2xl font-light text-foreground mb-6">
            {t("signin.title_1")} <span className="italic">{t("signin.title_2")}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("signin.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                {t("signin.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-2 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity duration-200"
            >
              <LogIn className="w-4 h-4" />
              {t("signin.btn")}
            </button>
          </form>
        </motion.div>

        <motion.p variants={fadeUp} className="text-center font-body text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            ← {t("signin.back")}
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;