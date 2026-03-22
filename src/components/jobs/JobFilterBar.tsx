import type { JobFilterState, JobSort } from "../../lib/filterJobs";
import { FILTER_ALL } from "../../lib/filterJobs";

type Props = {
  value: JobFilterState;
  onChange: (next: JobFilterState) => void;
  locations: string[];
};

export function JobFilterBar({ value, onChange, locations }: Props) {
  function patch<K extends keyof JobFilterState>(key: K, v: JobFilterState[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="jna-filter-bar" role="search" aria-label="Filter jobs">
      <div className="jna-filter-bar__grid">
        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-keyword">
            Keyword
          </label>
          <input
            id="filter-keyword"
            type="search"
            className="jna-input jna-input--full"
            placeholder="Search title or company"
            value={value.keyword}
            onChange={(e) => patch("keyword", e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-location">
            Location
          </label>
          <select
            id="filter-location"
            className="jna-input jna-select jna-input--full"
            value={value.location}
            onChange={(e) => patch("location", e.target.value)}
          >
            <option value={FILTER_ALL}>All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-mode">
            Mode
          </label>
          <select
            id="filter-mode"
            className="jna-input jna-select jna-input--full"
            value={value.mode}
            onChange={(e) => patch("mode", e.target.value)}
          >
            <option value={FILTER_ALL}>All modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-experience">
            Experience
          </label>
          <select
            id="filter-experience"
            className="jna-input jna-select jna-input--full"
            value={value.experience}
            onChange={(e) => patch("experience", e.target.value)}
          >
            <option value={FILTER_ALL}>All levels</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
          </select>
        </div>

        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-source">
            Source
          </label>
          <select
            id="filter-source"
            className="jna-input jna-select jna-input--full"
            value={value.source}
            onChange={(e) => patch("source", e.target.value)}
          >
            <option value={FILTER_ALL}>All sources</option>
            <option value="Linkedin">Linkedin</option>
            <option value="Naukri">Naukri</option>
            <option value="Indeed">Indeed</option>
          </select>
        </div>

        <div className="jna-field jna-field--filter">
          <label className="jna-label" htmlFor="filter-sort">
            Sort
          </label>
          <select
            id="filter-sort"
            className="jna-input jna-select jna-input--full"
            value={value.sort}
            onChange={(e) => patch("sort", e.target.value as JobSort)}
          >
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  );
}
