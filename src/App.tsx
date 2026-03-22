import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SectionPlaceholder } from "./pages/SectionPlaceholder";
import { Signup } from "./pages/Signup";

function BootGate({ children }: { children: ReactNode }) {
  const { ready } = useAuth();
  if (!ready) {
    return (
      <div className="jna-app">
        <main className="jna-main">
          <p className="jna-muted">Loading…</p>
        </main>
      </div>
    );
  }
  return <>{children}</>;
}

function HomeRedirect() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

function GuestOnly({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return (
      <div className="jna-app">
        <main className="jna-main">
          <p className="jna-muted">Loading…</p>
        </main>
      </div>
    );
  }
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BootGate>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestOnly>
              <Signup />
            </GuestOnly>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<SectionPlaceholder title="Dashboard" />} />
            <Route path="/saved" element={<SectionPlaceholder title="Saved" />} />
            <Route path="/digest" element={<SectionPlaceholder title="Digest" />} />
            <Route path="/settings" element={<SectionPlaceholder title="Settings" />} />
            <Route path="/proof" element={<SectionPlaceholder title="Proof" />} />
          </Route>
        </Route>

        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BootGate>
  );
}
