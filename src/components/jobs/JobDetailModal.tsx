import { useEffect, useId } from "react";
import type { Job } from "../../types/job";
import { formatPostedDaysAgo } from "../../lib/formatPosted";

type Props = {
  job: Job | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
};

export function JobDetailModal({ job, isSaved, onClose, onToggleSave }: Props) {
  const titleId = useId();

  useEffect(() => {
    if (!job) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [job]);

  useEffect(() => {
    if (!job) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [job, onClose]);

  if (!job) return null;

  const active = job;

  function onApply() {
    window.open(active.applyUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="jna-modal-root" role="presentation">
      <button type="button" className="jna-modal-backdrop" aria-label="Close dialog" onClick={onClose} />
      <div
        className="jna-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="jna-modal-header">
          <h2 id={titleId} className="jna-modal-title">
            {active.title}
          </h2>
          <button type="button" className="jna-modal-close jna-btn jna-btn--secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <p className="jna-modal-company">{active.company}</p>
        <p className="jna-modal-subtle">
          {active.location} · {active.mode} · {active.experience} · {active.salaryRange}
        </p>
        <p className="jna-modal-subtle">{formatPostedDaysAgo(active.postedDaysAgo)} · {active.source}</p>

        <div className="jna-modal-section">
          <h3 className="jna-modal-section-title">Description</h3>
          <div className="jna-modal-description">
            {active.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div className="jna-modal-section">
          <h3 className="jna-modal-section-title">Skills</h3>
          <ul className="jna-modal-skills">
            {active.skills.map((s) => (
              <li key={s}>
                <span className="jna-badge jna-badge--neutral">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="jna-modal-footer">
          <button type="button" className="jna-btn jna-btn--secondary" onClick={onToggleSave}>
            {isSaved ? "Remove from saved" : "Save"}
          </button>
          <button type="button" className="jna-btn jna-btn--primary" onClick={onApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
