import Sidebar from "@front/components/bar/Sidebar";
import { Outlet } from "react-router-dom";

import "@styles/layout.scss";

export default function Layout() {
  return (
    <main className="flex h-full global-layout">
      <aside className="flex-none global-sidebar">
        <Sidebar />
      </aside>
      <section className="flex-1 page-content">
        <div className="page-body">
          <Outlet />
        </div>
      </section>
    </main>
  );
}