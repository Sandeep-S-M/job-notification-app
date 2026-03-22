import { Link } from "react-router-dom";
import { AppFooter } from "../components/AppFooter";

export function LandingPage() {
  return (
    <div className="jna-app">
      <header className="jna-shell-header jna-shell-header--minimal" role="banner">
        <div className="jna-shell-bar">
          <Link to="/" className="jna-topbar__brandlink">
            Job Notification Tracker
          </Link>
        </div>
      </header>

      <main className="jna-main jna-landing-main" id="main">
        <section className="jna-landing-hero" aria-labelledby="landing-headline">
          <h1 id="landing-headline" className="jna-landing-headline">
            Stop Missing The Right Jobs.
          </h1>
          <p className="jna-context__sub jna-landing-sub">
            Precision-matched job discovery delivered daily at 9AM.
          </p>
          <div className="jna-landing-cta">
            <Link to="/settings" className="jna-btn jna-btn--primary">
              Start Tracking
            </Link>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
