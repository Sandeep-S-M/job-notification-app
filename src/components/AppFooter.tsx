export function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="jna-app-footer" role="contentinfo">
      <div className="jna-app-footer__inner">
        <p>© {year} Job Notification Tracker</p>
        <nav className="jna-app-footer__links" aria-label="Legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
