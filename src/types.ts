export type User = {
  id: string;
  email: string;
  name: string;
  /** Demo only — not secure; replace with a real backend. */
  password: string;
};

export type Session = {
  userId: string;
};

export type AlertRule = {
  id: string;
  keyword: string;
};

export type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  summary: string;
};
