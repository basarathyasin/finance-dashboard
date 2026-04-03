import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

const pageConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview and analytics",
  },
  "/records": {
    title: "Records",
    subtitle: "Manage your transactions",
  },
  "/users": {
    title: "Users",
    subtitle: "Manage access and roles",
  },
};

function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPage = pageConfig[location.pathname] || {
    title: "Finance Dashboard",
    subtitle: "Manage your finance workspace with confidence.",
  };

  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <p className="section-kicker">Finance Dashboard</p>
          <h1 className="sidebar-title">Workspace</h1>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
            to="/records"
          >
            Records
          </NavLink>
          {user?.role === "admin" ? (
            <NavLink
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
              to="/users"
            >
              Users
            </NavLink>
          ) : null}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-label">Signed in as</span>
          <strong>{user?.role}</strong>
          <span className="sidebar-footer-name">{user?.name}</span>
        </div>
      </aside>

      <section className="app-content">
        <header className="topbar">
          <div className="topbar-main">
            <p className="section-kicker">Workspace</p>
            <h2 className="topbar-title">{currentPage.title}</h2>
            <p className="topbar-copy">{currentPage.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <div className="user-chip">
              <span>{user?.name}</span>
              <small>{user?.email}</small>
            </div>
            <button className="ghost-button" onClick={logout} type="button">
              Logout
            </button>
          </div>
        </header>

        <div className="page-body">{children}</div>
      </section>
    </main>
  );
}

export default AppLayout;
