import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AppFooter } from "../components/AppFooter";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="jna-app">
      <header className="jna-topbar" role="banner">
        <Link className="jna-topbar__brandlink" to="/">
          Job Notification App
        </Link>
        <div className="jna-topbar__progress" aria-hidden="true" />
        <div className="jna-topbar__actions">
          <Link className="jna-topbar__link" to="/signup">
            Create account
          </Link>
        </div>
      </header>

      <main className="jna-main" id="main">
        <header className="jna-context jna-auth-card">
          <h1>Sign in</h1>
          <p className="jna-context__sub">Access your job alerts and notification rules.</p>
        </header>

        <div className="jna-auth-card">
          {error ? (
            <div className="jna-alert jna-alert--error jna-mb-24" role="alert">
              <h2 className="jna-alert__title">Sign-in did not complete</h2>
              <p>{error}</p>
            </div>
          ) : null}

          <article className="jna-card">
            <form onSubmit={onSubmit}>
              <div className="jna-field">
                <label className="jna-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="jna-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="jna-field">
                <label className="jna-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="jna-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="jna-alert__actions">
                <button type="submit" className="jna-btn jna-btn--primary">
                  Sign in
                </button>
              </div>
            </form>
          </article>

          <div className="jna-auth-foot">
            <p>
              New here?{" "}
              <Link to="/signup" className="jna-inline-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
