import { createContext, useContext, useState } from "react";

export interface UserData {
  fullName: string;
  email: string;
  dob: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isNewUser: boolean;
  user: UserData | null;
  login: (userData?: UserData) => void;
  signup: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("clario-auth") === "true"
  );

  const [isNewUser, setIsNewUser] = useState(
    () => localStorage.getItem("clario-new-user") === "true"
  );

  const [user, setUser] = useState<UserData | null>(() => {
    const stored = localStorage.getItem("clario-user");
    return stored ? JSON.parse(stored) : null;
  });

  // Called on Sign In — returning user
  const login = (userData?: UserData) => {
    setIsLoggedIn(true);
    setIsNewUser(false);
    localStorage.setItem("clario-auth", "true");
    localStorage.setItem("clario-new-user", "false");
    if (userData) {
      setUser(userData);
      localStorage.setItem("clario-user", JSON.stringify(userData));
    }
  };

  // Called on Sign Up — brand new user
  const signup = (userData: UserData) => {
    setIsLoggedIn(true);
    setIsNewUser(true);
    setUser(userData);
    localStorage.setItem("clario-auth", "true");
    localStorage.setItem("clario-new-user", "true");
    localStorage.setItem("clario-user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsNewUser(false);
    setUser(null);
    localStorage.removeItem("clario-auth");
    localStorage.removeItem("clario-new-user");
    localStorage.removeItem("clario-user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isNewUser, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};