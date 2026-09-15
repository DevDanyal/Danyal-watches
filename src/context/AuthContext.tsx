"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type User = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
};

export type StoredUser = User & { password: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  updateProfile: (patch: Partial<User>) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "crysma_users";
const SESSION_KEY = "crysma_session";

const readUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const isDbConfigured = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/health", { cache: "no-store" });
    const json = await res.json();
    return json?.data?.status === "connected";
  } catch {
    return false;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const db = await isDbConfigured();
        if (db) {
          const res = await fetch("/api/auth/me", { cache: "no-store" });
          const json = await res.json().catch(() => null);
          if (json?.ok && json?.data) {
            setUser({ ...json.data, phone: "", city: "", address: "" });
            return;
          }
        }
        const email = window.localStorage.getItem(SESSION_KEY);
        if (email) {
          const found = readUsers().find((u) => u.email === email);
          if (found) {
            const { password: _pw, ...rest } = found;
            void _pw;
            setUser(rest);
          }
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persistSession = (u: User) => {
    window.localStorage.setItem(SESSION_KEY, u.email);
    setUser(u);
  };

  const login = useCallback(
    async (email: string, password: string) => {
      const db = await isDbConfigured();
      if (db) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const json = await res.json().catch(() => null);
        if (json?.ok && json?.data) {
          setUser({ ...json.data, phone: "", city: "", address: "" });
          return { ok: true };
        }
        return { ok: false, error: json?.error ?? "Login failed." };
      }

      const users = readUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found)
        return { ok: false, error: "No account found with this email. Please register." };
      if (found.password !== password)
        return { ok: false, error: "Incorrect password. Please try again." };
      const { password: _pw, ...rest } = found;
      void _pw;
      persistSession(rest);
      return { ok: true };
    },
    []
  );

  const register = useCallback(async (name: string, email: string, password: string) => {
    if (password.length < 6)
      return { ok: false, error: "Password must be at least 6 characters." };

    const db = await isDbConfigured();
    if (db) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json().catch(() => null);
      if (json?.ok && json?.data) {
        setUser({ ...json.data, phone: "", city: "", address: "" });
        return { ok: true };
      }
      return { ok: false, error: json?.error ?? "Registration failed." };
    }

    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: "An account with this email already exists." };
    const newUser: StoredUser = { name, email, password, phone: "", city: "", address: "" };
    window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _pw, ...rest } = newUser;
    void _pw;
    persistSession(rest);
    return { ok: true };
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<User>) => {
      if (!user) return;
      const updated: User = { ...user, ...patch };
      const users = readUsers().map((u) =>
        u.email === user.email ? { ...u, ...patch } : u
      );
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setUser(updated);
    },
    [user]
  );

  const logout = useCallback(() => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}