import type { Job } from "../../types/job";
import { formatPostedDaysAgo } from "../../lib/formatPosted";

type Props = {
  job: Job;
  isSaved: boolean;
  onView: () => void;
  onToggleSave: () => void;
};

export function JobCard({ job, isSaved, onView, onToggleSave }: Props) {
  function onApply() {
    window.open(job.applyUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="jna-card jna-job-card">
      <div className="jna-job-card__top">
        <span className="jna-badge jna-badge--neutral">{job.source}</span>
        <span className="jna-job-card__posted">{formatPostedDaysAgo(job.postedDaysAgo)}</span>
      </div>

      <h2 className="jna-job-card__title">{job.title}</h2>
      <p className="jna-job-card__company">{job.company}</p>

      <dl className="jna-job-card__meta">
        <div>
          <dt className="sr-only">Location and mode</dt>
          <dd>
            {job.location}
            <span className="jna-job-card__sep" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
            {job.mode}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Experience</dt>
          <dd>{job.experience}</dd>
        </div>
        <div>
          <dt className="sr-only">Salary</dt>
          <dd className="jna-job-card__salary">{job.salaryRange}</dd>
        </div>
      </dl>

      <div className="jna-job-card__actions">
        <button type="button" className="jna-btn jna-btn--secondary" onClick={onView}>
          View
        </button>
        <button type="button" className={isSaved ? "jna-btn jna-btn--secondary" : "jna-btn jna-btn--primary"} onClick={onToggleSave}>
          {isSaved ? "Saved" : "Save"}
        </button>
        <button type="button" className="jna-btn jna-btn--primary" onClick={onApply}>
          Apply
        </button>
      </div>
    </article>
  );
}
