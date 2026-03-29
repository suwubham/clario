import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("signup.pw_mismatch"));
      return;
    }
    setError("");
    signup({ fullName, email, dob });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-6 py-12">
      <div className="grain-overlay" />
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center gap-3">
            <img src="favicon.ico" alt="Clario" className="w-10 h-10 rounded-xl" />
            <span className="font-display text-4xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200">
              Clario
            </span>
          </Link>
          <p className="font-body text-sm text-muted-foreground mt-3">{t("signup.subtitle")}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <h1 className="font-display text-2xl font-light text-foreground mb-8">
            {t("signup.title_1")} <span className="italic text-primary">{t("signup.title_2")}</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signup.full_name")}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jordan Smith" required className="signin-input" />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signup.dob")}</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="signin-input" />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signup.email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="signin-input" />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signup.password")}</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="signin-input pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2">{t("signup.confirm_pw")}</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="signin-input pr-11" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="font-body text-xs text-destructive">{error}</p>}

            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-2 bg-primary text-primary-foreground font-body text-sm font-medium rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200" style={{ boxShadow: "var(--shadow-soft)" }}>
              <UserPlus className="w-4 h-4" />
              {t("signup.btn")}
            </button>
          </form>

          <p className="font-body text-sm text-center text-muted-foreground mt-6">
            {t("signup.have_account")}{" "}
            <Link to="/signin" className="text-primary font-medium hover:opacity-80 transition-opacity">
              {t("signup.signin_link")}
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

export default SignUp;