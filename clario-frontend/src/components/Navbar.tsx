import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Journal", path: "/dashboard" },
  // { label: "Settings", path: "/settings" },
];

const Navbar = () => {
  const location = useLocation();

  // ✅ FIX: call hook properly
  const { isSignedIn, user } = useUser();
  console.log(user);

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
          to="/"
          className="font-display text-2xl font-semibold tracking-tight text-foreground"
        >
          Clario
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          
          {/* Nav Links */}
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

          {/* Clerk Auth UI */}
          {!isSignedIn ? (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-sm px-4 py-1.5 rounded-md border border-border hover:bg-muted transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="text-sm px-4 py-1.5 rounded-md bg-primary text-white hover:opacity-90 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton />
          )}

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;