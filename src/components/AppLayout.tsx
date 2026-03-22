import { Outlet } from "react-router-dom";
import { AppFooter } from "./AppFooter";
import { AppTopNav } from "./AppTopNav";

export function AppLayout() {
  return (
    <div className="jna-app">
      <AppTopNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}
