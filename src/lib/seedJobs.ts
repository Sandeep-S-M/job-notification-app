import type { JobPosting } from "../types";

export const SEED_JOBS: JobPosting[] = [
  {
    id: "j1",
    title: "Senior Product Designer",
    company: "Northline Systems",
    location: "Remote · US",
    postedAt: "2025-03-18",
    summary: "Design systems, research, and close partnership with engineering.",
  },
  {
    id: "j2",
    title: "Backend Engineer — Payments",
    company: "Harbor Financial",
    location: "New York, NY",
    postedAt: "2025-03-17",
    summary: "Rust or Go, high-reliability APIs, on-call rotation shared across the team.",
  },
  {
    id: "j3",
    title: "Customer Success Manager",
    company: "Ledgerly",
    location: "Austin, TX · Hybrid",
    postedAt: "2025-03-16",
    summary: "Own onboarding and expansion for mid-market accounts.",
  },
  {
    id: "j4",
    title: "Staff Software Engineer",
    company: "Crescent Data",
    location: "Remote · EU",
    postedAt: "2025-03-15",
    summary: "Distributed systems, mentoring, and roadmap input for platform teams.",
  },
  {
    id: "j5",
    title: "Marketing Operations Lead",
    company: "Northline Systems",
    location: "Chicago, IL",
    postedAt: "2025-03-14",
    summary: "HubSpot, attribution, and cross-functional campaign execution.",
  },
];

export function jobMatchesRules(job: JobPosting, rules: { keyword: string }[]): boolean {
  if (rules.length === 0) return false;
  const hay = `${job.title} ${job.company} ${job.summary}`.toLowerCase();
  return rules.some((r) => {
    const q = r.keyword.trim().toLowerCase();
    return q.length > 0 && hay.includes(q);
  });
}
