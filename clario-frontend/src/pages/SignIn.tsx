import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-6">
      <div className="grain-overlay" />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <Link to="/" className="font-display text-4xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200">
            Clario
          </Link>
          <p className="font-body text-sm text-muted-foreground mt-3">{t("signin.subtitle")}</p>
        </motion.div>

        {/* Card */}
        <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <h1 className="font-display text-2xl font-light text-foreground mb-8">
            {t("signin.title_1")} <span className="italic text-primary">{t("signin.title_2")}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signin.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="signin-input"
              />
            </div>

            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signin.password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="signin-input pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-2 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200" style={{ boxShadow: "var(--shadow-soft)" }}>
              <LogIn className="w-4 h-4" />
              {t("signin.btn")}
            </button>
          </form>

          {/* Sign up link */}
          <p className="font-body text-sm text-center text-muted-foreground mt-6">
            {t("signin.no_account")}{" "}
            <Link to="/signup" className="text-primary font-medium hover:opacity-80 transition-opacity">
              {t("signin.signup_link")}
            </Link>
          </p>
        </motion.div>

        <motion.p variants={fadeUp} className="text-center font-body text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-foreground transition-colors duration-200 underline underline-offset-4">
            ← {t("signin.back")}
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignIn;