import { useMemo, useState } from "react";
import { getJobById } from "../data/indianTechJobs";
import { JobCard } from "../components/jobs/JobCard";
import { JobDetailModal } from "../components/jobs/JobDetailModal";
import { useSavedJobs } from "../hooks/useSavedJobs";
import { getSavedJobIds } from "../lib/savedJobs";
import type { Job } from "../types/job";

export function SavedPage() {
  const { savedIds, toggle, saved } = useSavedJobs();
  const [modalJobId, setModalJobId] = useState<string | null>(null);

  const savedJobs = useMemo(() => {
    return getSavedJobIds()
      .map((id) => getJobById(id))
      .filter((j): j is Job => j !== undefined);
  }, [savedIds]);

  const modalJob = modalJobId ? getJobById(modalJobId) : null;

  return (
    <main className="jna-main jna-job-board" id="main">
      <header className="jna-context">
        <h1>Saved</h1>
        <p className="jna-context__sub">Roles you save on the dashboard stay here in this browser via localStorage.</p>
      </header>

      {savedJobs.length === 0 ? (
        <div className="jna-alert jna-alert--empty jna-empty-premium">
          <h2 className="jna-alert__title">Nothing saved yet</h2>
          <p>
            Open the dashboard, then use <strong>Save</strong> on any card. Your list persists after refresh and will
            appear here automatically.
          </p>
        </div>
      ) : (
        <ul className="jna-job-card-grid">
          {savedJobs.map((job) => (
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
