import { Fragment, useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/saved", label: "Saved" },
  { to: "/digest", label: "Digest" },
  { to: "/settings", label: "Settings" },
  { to: "/proof", label: "Proof" },
] as const;

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "jna-nav__link jna-nav__link--active" : "jna-nav__link";
}

export function AppTopNav() {
  const location = useLocation();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="jna-shell-header" role="banner">
      <div className="jna-shell-bar">
        <Link to="/" className="jna-topbar__brandlink">
          Job Notification Tracker
        </Link>

        <nav className="jna-nav-desktop" aria-label="Main">
          <ul className="jna-nav__list">
            {NAV_ITEMS.map(({ to, label }, i) => (
              <Fragment key={to}>
                {i > 0 ? (
                  <li className="jna-nav__pipe" aria-hidden="true">
                    |
                  </li>
                ) : null}
                <li>
                  <NavLink to={to} className={navLinkClassName}>
                    {label}
                  </NavLink>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        <div className="jna-shell-bar__end">
          <button
            type="button"
            className="jna-nav-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="jna-nav-toggle__bar" />
            <span className="jna-nav-toggle__bar" />
            <span className="jna-nav-toggle__bar" />
          </button>
        </div>
      </div>

      <div id={panelId} className={open ? "jna-nav-drawer is-open" : "jna-nav-drawer"} aria-hidden={!open}>
        <nav className="jna-nav-drawer__inner" aria-label="Main">
          <ul className="jna-nav-drawer__list">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClassName} onClick={() => setOpen(false)}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
