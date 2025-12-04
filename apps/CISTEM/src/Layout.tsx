import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="main menu">
        <Outlet />
    </main>
  );
}