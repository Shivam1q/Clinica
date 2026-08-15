import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/schedule", label: "Schedule" },
  { to: "/billing", label: "Billing" },
  { to: "/portal", label: "Portal" },
];

const AppLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.replace("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <p className="sidebar-brand">Clinica</p>
        <nav className="sidebar-nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link is-active" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <p className="app-header-user">{user?.name ?? "Clinica"}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Log out
          </button>
        </header>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
