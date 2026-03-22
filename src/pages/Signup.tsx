import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AppFooter } from "../components/AppFooter";

export function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = signup(name, email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="jna-app">
      <header className="jna-topbar" role="banner">
        <Link className="jna-topbar__brandlink" to="/">
          Job Notification App
        </Link>
        <div className="jna-topbar__progress" aria-hidden="true" />
        <div className="jna-topbar__actions">
          <Link className="jna-topbar__link" to="/login">
            Sign in
          </Link>
        </div>
      </header>

      <main className="jna-main" id="main">
        <header className="jna-context jna-auth-card">
          <h1>Create your account</h1>
          <p className="jna-context__sub">
            Store alerts in this browser for now. A hosted backend will sync across devices later.
          </p>
        </header>

        <div className="jna-auth-card">
          {error ? (
            <div className="jna-alert jna-alert--error jna-mb-24" role="alert">
              <h2 className="jna-alert__title">Account was not created</h2>
              <p>{error}</p>
            </div>
          ) : null}

          <article className="jna-card">
            <form onSubmit={onSubmit}>
              <div className="jna-field">
                <label className="jna-label" htmlFor="signup-name">
                  Full name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="jna-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="jna-field">
                <label className="jna-label" htmlFor="signup-email">
                  Work email
                </label>
                <input
                  id="signup-email"
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
                <label className="jna-label" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="jna-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="jna-muted" style={{ marginTop: "var(--space-8)", marginBottom: 0 }}>
                  At least 8 characters. This demo stores credentials in your browser only—not for production.
                </p>
              </div>
              <div className="jna-alert__actions">
                <button type="submit" className="jna-btn jna-btn--primary">
                  Create account
                </button>
              </div>
            </form>
          </article>

          <div className="jna-auth-foot">
            <p>
              Already registered?{" "}
              <Link to="/login" className="jna-inline-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
