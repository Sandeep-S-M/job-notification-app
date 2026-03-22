export function SettingsPage() {
  return (
    <main className="jna-main" id="main">
      <header className="jna-context">
        <h1>Settings</h1>
        <p className="jna-context__sub">Preference fields are visual placeholders only—nothing is saved in this build.</p>
      </header>

      <div className="jna-settings-form" role="group" aria-label="Notification preferences">
        <article className="jna-card jna-settings-card">
          <div className="jna-field">
            <label className="jna-label" htmlFor="settings-keywords">
              Role keywords
            </label>
            <input
              id="settings-keywords"
              name="roleKeywords"
              type="text"
              className="jna-input"
              placeholder="e.g. product design, backend engineer"
              autoComplete="off"
            />
          </div>

          <div className="jna-field">
            <label className="jna-label" htmlFor="settings-locations">
              Preferred locations
            </label>
            <input
              id="settings-locations"
              name="locations"
              type="text"
              className="jna-input"
              placeholder="e.g. New York, Remote — US"
              autoComplete="off"
            />
          </div>

          <div className="jna-field">
            <label className="jna-label" htmlFor="settings-mode">
              Mode
            </label>
            <select id="settings-mode" name="mode" className="jna-input jna-select">
              <option value="">Select</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>

          <div className="jna-field jna-field--last">
            <label className="jna-label" htmlFor="settings-experience">
              Experience level
            </label>
            <select id="settings-experience" name="experience" className="jna-input jna-select">
              <option value="">Select</option>
              <option value="entry">Entry</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </article>
      </div>
    </main>
  );
}
