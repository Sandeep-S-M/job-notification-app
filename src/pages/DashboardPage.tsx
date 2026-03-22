import { useMemo, useState } from "react";
import { getJobById, INDIAN_TECH_JOBS } from "../data/indianTechJobs";
import { JobFilterBar } from "../components/jobs/JobFilterBar";
import { JobCard } from "../components/jobs/JobCard";
import { JobDetailModal } from "../components/jobs/JobDetailModal";
import { useSavedJobs } from "../hooks/useSavedJobs";
import {
  FILTER_ALL,
  filterAndSortJobs,
  type JobFilterState,
  uniqueLocations,
} from "../lib/filterJobs";
const DEFAULT_FILTERS: JobFilterState = {
  keyword: "",
  location: FILTER_ALL,
  mode: FILTER_ALL,
  experience: FILTER_ALL,
  source: FILTER_ALL,
  sort: "latest",
};

export function DashboardPage() {
  const [filters, setFilters] = useState<JobFilterState>(DEFAULT_FILTERS);
  const [modalJobId, setModalJobId] = useState<string | null>(null);
  const { toggle, saved } = useSavedJobs();

  const locations = useMemo(() => uniqueLocations(INDIAN_TECH_JOBS), []);

  const filtered = useMemo(
    () => filterAndSortJobs(INDIAN_TECH_JOBS, filters),
    [filters],
  );

  const modalJob = modalJobId ? getJobById(modalJobId) : null;

  return (
    <main className="jna-main jna-job-board" id="main">
      <header className="jna-context">
        <h1>Dashboard</h1>
        <p className="jna-context__sub">
          Curated Indian tech openings—filter by keyword, location, mode, and more. Save roles to revisit on the Saved
          tab.
        </p>
      </header>

      <JobFilterBar value={filters} onChange={setFilters} locations={locations} />

      {filtered.length === 0 ? (
        <div className="jna-alert jna-alert--empty jna-empty-premium jna-empty-results">
          <h2 className="jna-alert__title">No Jobs match your search.</h2>
          <p>Try clearing filters or broadening your keyword.</p>
        </div>
      ) : (
        <ul className="jna-job-card-grid">
          {filtered.map((job) => (
            <li key={job.id}>
              <JobCard
                job={job}
                isSaved={saved(job.id)}
                onView={() => setModalJobId(job.id)}
                onToggleSave={() => toggle(job.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <JobDetailModal
        job={modalJob ?? null}
        isSaved={modalJob ? saved(modalJob.id) : false}
        onClose={() => setModalJobId(null)}
        onToggleSave={() => {
          if (modalJob) toggle(modalJob.id);
        }}
      />
    </main>
  );
}
