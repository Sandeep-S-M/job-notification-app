import type { Job, JobExperience, JobMode, JobSource } from "../types/job";

export type JobSort = "latest" | "oldest";

export type JobFilterState = {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: JobSort;
};

const ALL = "";

export function uniqueLocations(jobs: Job[]): string[] {
  return [...new Set(jobs.map((j) => j.location))].sort((a, b) => a.localeCompare(b));
}

export function filterAndSortJobs(jobs: Job[], f: JobFilterState): Job[] {
  const kw = f.keyword.trim().toLowerCase();

  let out = jobs.filter((j) => {
    if (kw) {
      const hay = `${j.title} ${j.company}`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    if (f.location !== ALL && j.location !== f.location) return false;
    if (f.mode !== ALL && j.mode !== (f.mode as JobMode)) return false;
    if (f.experience !== ALL && j.experience !== (f.experience as JobExperience)) return false;
    if (f.source !== ALL && j.source !== (f.source as JobSource)) return false;
    return true;
  });

  out = [...out].sort((a, b) =>
    f.sort === "latest"
      ? a.postedDaysAgo - b.postedDaysAgo
      : b.postedDaysAgo - a.postedDaysAgo,
  );

  return out;
}

export const FILTER_ALL = ALL;
