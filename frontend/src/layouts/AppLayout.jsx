import { useAuth } from "../modules/auth/hooks/useAuth";

function AppLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <main className="app-layout">
      <header className="topbar">
        <div>
          <p className="section-kicker">Finance Dashboard</p>
          <h1 className="topbar-title">Welcome back, {user?.name}</h1>
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
