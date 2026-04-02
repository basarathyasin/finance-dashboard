import { NavLink } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

function AppLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <main className="app-layout">
      <header className="topbar">
        <div className="topbar-main">
          <p className="section-kicker">Finance Dashboard</p>
          <h1 className="topbar-title">Welcome back, {user?.name}</h1>
          <nav className="topbar-nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
              to="/"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
              to="/records"
            >
              Records
            </NavLink>
          </nav>
        </div>
        <div className="topbar-actions">
          <div className="user-chip">
            <span>{user?.email}</span>
            <strong>{user?.role}</strong>
          </div>
          <button className="ghost-button" onClick={logout} type="button">
            Logout
          </button>
        </div>
      </header>
      {children}
    </main>
  );
}

export default AppLayout;
