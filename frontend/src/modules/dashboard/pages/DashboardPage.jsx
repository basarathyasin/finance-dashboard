import { useAuth } from "../../auth/hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="dashboard-grid">
      <article className="stat-card stat-card-wide">
        <p className="section-kicker">Authentication</p>
        <h2>Frontend auth flow is connected to the backend.</h2>
        <p>
          The JWT is stored in local storage, restored on refresh, and all protected
          routes redirect unauthenticated users back to login.
        </p>
      </article>

      <article className="stat-card">
        <span className="stat-label">Name</span>
        <strong>{user?.name}</strong>
      </article>

      <article className="stat-card">
        <span className="stat-label">Role</span>
        <strong>{user?.role}</strong>
      </article>
    </section>
  );
}

export default DashboardPage;
