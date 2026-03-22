export type JobMode = "Remote" | "Hybrid" | "Onsite";

export type JobExperience = "Fresher" | "0-1" | "1-3" | "3-5";

export type JobSource = "Linkedin" | "Naukri" | "Indeed";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: JobMode;
  experience: JobExperience;
  skills: string[];
  source: JobSource;
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
};
