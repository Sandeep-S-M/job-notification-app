import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { User } from "../types";
import {
  findUserByEmail,
  findUserById,
  getSession,
  getUsers,
  saveUsers,
  setSession,
} from "../lib/storage";

type AuthState = {
  user: User | null;
  ready: boolean;
};

const AuthContext = createContext<{
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
  signup: (name: string, email: string, password: string) => { ok: true } | { ok: false; message: string };
  logout: () => void;
} | null>(null);

let authListeners = new Set<() => void>();
let cache: AuthState = { user: null, ready: false };

function readAuthFromStorage(): AuthState {
  if (typeof window === "undefined") return { user: null, ready: false };
  const session = getSession();
  if (!session) return { user: null, ready: true };
  const user = findUserById(session.userId);
  return { user: user ?? null, ready: true };
}

function emitAuth() {
  cache = readAuthFromStorage();
  authListeners.forEach((fn) => fn());
}

function subscribeAuth(cb: () => void) {
  authListeners.add(cb);
  return () => {
    authListeners.delete(cb);
  };
}

function getAuthSnapshot(): AuthState {
  if (!cache.ready && typeof window !== "undefined") {
    cache = readAuthFromStorage();
  }
  return cache;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribeAuth, getAuthSnapshot, () => ({
    user: null,
    ready: false,
  }));

  const login = useCallback((email: string, password: string) => {
    const user = findUserByEmail(email);
    if (!user) {
      return {
        ok: false as const,
        message:
          "No account matches that email. Create an account first, or check for a typo in the address.",
      };
    }
    if (user.password !== password) {
      return {
        ok: false as const,
        message: "That password does not match our records. Try again or reset it when we ship that flow.",
      };
    }
    setSession({ userId: user.id });
    emitAuth();
    return { ok: true as const };
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail || !password) {
      return { ok: false as const, message: "Enter your name, email, and a password to continue." };
    }
    if (findUserByEmail(trimmedEmail)) {
      return {
        ok: false as const,
        message: "An account already exists for that email. Sign in instead.",
      };
    }
    const users = getUsers();
    const user: User = {
      id: crypto.randomUUID(),
      email: trimmedEmail,
      name: trimmedName,
      password,
    };
    saveUsers([...users, user]);
    setSession({ userId: user.id });
    emitAuth();
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    emitAuth();
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      ready: state.ready,
      login,
      signup,
      logout,
    }),
    [state.user, state.ready, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
