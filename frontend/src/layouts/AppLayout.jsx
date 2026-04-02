import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/records": "Records",
  "/users": "Users",
};

function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Finance Dashboard";

  return (
    <main className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <p className="section-kicker">Finance Dashboard</p>
          <h1 className="sidebar-title">Control panel</h1>
          <p className="sidebar-copy">
            Simple navigation for analytics, records, and user management.
          </p>
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
        </div>
      </aside>

      <section className="app-content">
        <header className="topbar">
          <div className="topbar-main">
            <p className="section-kicker">Workspace</p>
            <h2 className="topbar-title">{pageTitle}</h2>
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

        {children}
      </section>
    </main>
  );
}

export default AppLayout;
