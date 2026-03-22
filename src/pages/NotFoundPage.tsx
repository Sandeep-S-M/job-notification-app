import { Link } from "react-router-dom";
import { AppFooter } from "../components/AppFooter";

export function NotFoundPage() {
  return (
    <div className="jna-app">
      <header className="jna-shell-header jna-shell-header--minimal" role="banner">
        <div className="jna-shell-bar">
          <Link to="/" className="jna-topbar__brandlink">
            Job Notification Tracker
          </Link>
        </div>
      </header>
      <main className="jna-main" id="main">
        <header className="jna-context">
          <h1>Page Not Found</h1>
          <p className="jna-context__sub">The page you are looking for does not exist.</p>
          <p className="jna-context__sub jna-notfound-linkwrap">
            <Link to="/" className="jna-inline-link">
              Return home
            </Link>
          </p>
        </header>
      </main>
      <AppFooter />
    </div>
  );
}
