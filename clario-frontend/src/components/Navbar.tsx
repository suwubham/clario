import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, LogIn, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import i18n from "@/i18n";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const isDark = theme === "dark";

  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ne" : "en";
    setCurrentLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("clario-lang", newLang);
  };

  // Not logged in: Home (/), About
  // Logged in: Home (/home), Journal (/dashboard), Settings (/settings)
  const navItems = isLoggedIn
    ? [
        { label: t("nav.home"), path: "/home" },
        { label: t("nav.journal"), path: "/dashboard" },
        { label: t("nav.settings"), path: "/settings" },
      ]
    : [
        { label: t("nav.home"), path: "/" },
        { label: t("nav.about"), path: "/about" },
      ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={isLoggedIn ? "/home" : "/"}
          className="font-display text-2xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200"
        >
          Clario
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={currentLang === "en" ? "Switch to नेपाली" : "Switch to English"}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-body text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            <Languages className="w-3.5 h-3.5" />
            {currentLang === "en" ? "EN" : "ने"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sign In / Sign Out */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-body text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              {t("nav.signout")}
            </button>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              <LogIn className="w-4 h-4" />
              {t("nav.signin")}
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;