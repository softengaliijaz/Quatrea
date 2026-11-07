import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-svh bg-bg text-ink">
      <Outlet />
    </main>
  );
}
