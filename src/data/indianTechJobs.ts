import type { Job, JobExperience, JobMode, JobSource } from "../types/job";

const COMPANIES = [
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "Capgemini",
  "Cognizant",
  "IBM India",
  "Oracle India",
  "SAP Labs India",
  "Dell Technologies",
  "Amazon India",
  "Flipkart",
  "Swiggy",
  "Razorpay",
  "PhonePe",
  "Paytm",
  "Zoho Corp",
  "Freshworks",
  "Juspay",
  "CRED",
  "Meesho",
  "Groww",
  "Zerodha",
  "Dream11",
  "Unacademy",
  "Zeta",
  "Udaan",
  "Lenskart",
  "Ola",
  "Practo",
  "Slice",
  "Mindtree",
  "LTIMindtree",
  "Tech Mahindra",
  "HCLTech",
  "Mphasis",
  "Hexaware",
  "Persistent Systems",
  "Publicis Sapient",
  "Thoughtworks",
  "HashedIn",
  "Chargebee",
  "Postman",
  "BrowserStack",
  "ClearTax",
  "Pine Labs",
  "Ather Energy",
  "Urban Company",
  "PharmEasy",
  "Nykaa",
] as const;

const LOCATIONS = [
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Noida, Uttar Pradesh",
  "Gurgaon, Haryana",
  "Mumbai, Maharashtra",
  "Kolkata, West Bengal",
  "Coimbatore, Tamil Nadu",
  "Indore, Madhya Pradesh",
  "Ahmedabad, Gujarat",
  "Kochi, Kerala",
  "Remote — India",
  "Bengaluru (Hybrid)",
  "Pune (Hybrid)",
  "Hyderabad (Hybrid)",
  "Chennai (Hybrid)",
  "NCR — Hybrid",
] as const;

const MODES: JobMode[] = ["Remote", "Hybrid", "Onsite"];
const SOURCES: JobSource[] = ["Linkedin", "Naukri", "Indeed"];
const EXPERIENCES: JobExperience[] = ["Fresher", "0-1", "1-3", "3-5"];
const SALARIES = ["15k-40k/month Internship", "3-5 LPA", "6-10 LPA", "10-18 LPA"] as const;

const TITLES: string[] = [
  "SDE Intern",
  "Graduate Engineer Trainee",
  "Junior Backend Developer",
  "Frontend Intern",
  "QA Intern",
  "Data Analyst Intern",
  "Java Developer (0-1 Yr)",
  "Python Developer (Fresher)",
  "React Developer (1-3 Yrs)",
  "DevOps Engineer Intern",
  "Android Developer Intern",
  "Full Stack Developer (0-1)",
  "Node.js Developer (0-1 Yr)",
  "iOS Developer (1-3 Yrs)",
  "ML Intern",
  "SDE — Backend (1-3 Yrs)",
  "Frontend Developer (React, 1-3)",
  "QA Engineer (0-1)",
  "Data Engineer (1-3 Yrs)",
  "Cloud Engineer Intern",
  "Security Analyst Intern",
  "SDE Intern — Platform",
  "GET — Java Microservices",
  "Junior React Native Developer",
  "Test Automation Intern",
  "Analytics Engineer Intern",
  "Kotlin Developer (0-1)",
  "Spring Boot Developer (1-3)",
  "SDE II (3-5 Yrs)",
  "Senior Frontend Engineer (3-5)",
  "Backend Engineer — Python",
  "SDE Intern (Summer Cohort)",
  "Associate Software Engineer",
  "Trainee Technology",
  "Software Engineer I",
  "Software Engineer II",
  "Intern — Payments",
  "Intern — Logistics Tech",
  "Graduate Trainee — QA",
  "Fresher — Full Stack",
  "Java Backend Developer (1-3)",
  "React + TypeScript Developer (1-3)",
  "Intern — Data Platform",
  "GET — Cloud Infrastructure",
  "Junior Site Reliability Engineer",
  "Intern — Mobile Engineering",
  "SDE — Fintech Core",
  "Developer — E-commerce Catalog",
  "Intern — Search & Recommendations",
  "Associate Backend Developer",
  "Frontend Engineer (0-1 Yr)",
  "QA — Manual + API Testing",
  "Data Analyst (0-1 Yr)",
  "DevOps Engineer (1-3 Yrs)",
  "ML Engineer (1-3 Yrs)",
  "Platform Engineer Intern",
  "Product Engineering Intern",
  "SDE — Growth & Engagement",
  "Intern — Developer Tools",
  "Associate — Platform Reliability",
];

const SKILL_POOLS = [
  ["Java", "Spring Boot", "SQL", "REST APIs"],
  ["React", "TypeScript", "HTML", "CSS"],
  ["Python", "Django", "PostgreSQL"],
  ["Manual Testing", "API Testing", "Postman"],
  ["SQL", "Excel", "Python", "Pandas"],
  ["AWS", "Docker", "Linux"],
  ["Kotlin", "Android SDK", "Firebase"],
  ["Swift", "iOS", "UIKit"],
  ["Node.js", "Express", "MongoDB"],
  ["Git", "CI/CD", "Kubernetes"],
  ["JavaScript", "Vue.js", "Webpack"],
  ["C++", "DSA", "System Design basics"],
];

function skillsFor(index: number): string[] {
  const a = SKILL_POOLS[index % SKILL_POOLS.length]!;
  const b = SKILL_POOLS[(index + 4) % SKILL_POOLS.length]!;
  return [...new Set([...a, ...b.slice(0, 2)])].slice(0, 5);
}

function buildApplyUrl(source: JobSource, idNum: number): string {
  const n = 382000 + idNum;
  switch (source) {
    case "Linkedin":
      return `https://www.linkedin.com/jobs/view/${382100000 + idNum}`;
    case "Naukri":
      return `https://www.naukri.com/job-listings?xid=${n}`;
    case "Indeed":
      return `https://in.indeed.com/viewjob?jk=${n.toString(16)}f${idNum}ab`;
    default:
      return `https://www.linkedin.com/jobs/view/${382100000 + idNum}`;
  }
}

function descriptionFor(
  index: number,
  company: string,
  title: string,
  location: string,
  mode: JobMode,
): string {
  const city = location.split(",")[0]!.split("(")[0]!.trim();
  const p1 = `${company} is hiring for ${title} based in ${city}. The team builds and operates software used at meaningful scale across Indian users and enterprise clients.`;
  const p2 = `Day-to-day work includes implementation, unit testing, code review participation, and collaboration with product and QA. You should be comfortable reading existing codebases and asking clarifying questions early.`;
  const p3 = `Engineering culture emphasises documentation, incremental delivery, and observability where applicable. Mentorship is available from senior engineers and leads during your ramp-up.`;
  const modeNote =
    mode === "Remote"
      ? `This is a remote-friendly position within India; occasional travel for team meets may be scheduled.`
      : mode === "Hybrid"
        ? `Hybrid cadence blends in-office days with work-from-home per team policy and project milestones.`
        : `Onsite role from the listed office location with standard collaboration hours aligned to the business unit.`;
  const p4 = `Compensation aligns with the advertised band; benefits and learning allowances follow company policy for your employment type (intern / full-time).`;
  const p5 = `Role reference #${index + 1}: screening may include online assessment and technical discussion focused on fundamentals relevant to ${title.split("—")[0]!.trim()}.`;
  return [p1, p2, p3, modeNote, p4, p5].join("\n\n");
}

function buildJob(index: number): Job {
  const idNum = index + 1;
  const id = `jnt-${String(idNum).padStart(3, "0")}`;
  const company = COMPANIES[index % COMPANIES.length]!;
  const location = LOCATIONS[index % LOCATIONS.length]!;
  const mode = MODES[index % MODES.length]!;
  const experience = EXPERIENCES[index % EXPERIENCES.length]!;
  const source = SOURCES[index % SOURCES.length]!;
  const postedDaysAgo = index % 11;
  const salaryRange = SALARIES[(index + postedDaysAgo + source.length) % SALARIES.length]!;
  const title = TITLES[index]!;
  const skills = skillsFor(index);
  const description = descriptionFor(index, company, title, location, mode);
  const applyUrl = buildApplyUrl(source, idNum);

  return {
    id,
    title,
    company,
    location,
    mode,
    experience,
    skills,
    source,
    postedDaysAgo,
    salaryRange,
    applyUrl,
    description,
  };
}

export const INDIAN_TECH_JOBS: Job[] = Array.from({ length: 60 }, (_, i) => buildJob(i));

export function getJobById(id: string): Job | undefined {
  return INDIAN_TECH_JOBS.find((j) => j.id === id);
}
