const STORAGE_KEY = "jnt_saved_job_ids";

export function getSavedJobIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function setSavedJobIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)]));
}

export function isJobSaved(id: string): boolean {
  return getSavedJobIds().includes(id);
}

/** Returns true if job is saved after toggle. */
export function toggleSavedJob(id: string): boolean {
  const set = new Set(getSavedJobIds());
  if (set.has(id)) set.delete(id);
  else set.add(id);
  setSavedJobIds([...set]);
  return set.has(id);
}
