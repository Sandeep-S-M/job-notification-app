import type { AlertRule, Session, User } from "../types";

const USERS_KEY = "jna_users";
const SESSION_KEY = "jna_session";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): User[] {
  return readJson<User[]>(USERS_KEY, []);
}

export function saveUsers(users: User[]) {
  writeJson(USERS_KEY, users);
}

export function getSession(): Session | null {
  return readJson<Session | null>(SESSION_KEY, null);
}

export function setSession(session: Session | null) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else writeJson(SESSION_KEY, session);
}

export function findUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function findUserByEmail(email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

function rulesKey(userId: string) {
  return `jna_rules_${userId}`;
}

function readSetKey(userId: string, suffix: string) {
  return readJson<string[]>(`jna_${suffix}_${userId}`, []);
}

function writeSetKey(userId: string, suffix: string, ids: string[]) {
  writeJson(`jna_${suffix}_${userId}`, ids);
}

export function getRules(userId: string): AlertRule[] {
  return readJson<AlertRule[]>(rulesKey(userId), []);
}

export function saveRules(userId: string, rules: AlertRule[]) {
  writeJson(rulesKey(userId), rules);
}

export function getDismissedJobIds(userId: string): Set<string> {
  return new Set(readSetKey(userId, "dismissed_jobs"));
}

export function dismissJob(userId: string, jobId: string) {
  const s = getDismissedJobIds(userId);
  s.add(jobId);
  writeSetKey(userId, "dismissed_jobs", [...s]);
}

export function getReadJobIds(userId: string): Set<string> {
  return new Set(readSetKey(userId, "read_jobs"));
}

export function markJobRead(userId: string, jobId: string) {
  const s = getReadJobIds(userId);
  s.add(jobId);
  writeSetKey(userId, "read_jobs", [...s]);
}
