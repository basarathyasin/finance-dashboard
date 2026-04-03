import { useEffect } from "react";
import ErrorState from "../../../components/ErrorState";
import LoadingState from "../../../components/LoadingState";
import { useAuth } from "../../auth/hooks/useAuth";
import CategoryBreakdown from "../components/CategoryBreakdown";
import SummaryCards from "../components/SummaryCards";
import TrendList from "../components/TrendList";
import { useDashboard } from "../hooks/useDashboard";

function DashboardPage() {
  const { user } = useAuth();
  const { summary, categories, trends, isLoading, error, loadDashboard } =
    useDashboard();

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <section className="dashboard-page">
      <article className="hero-card">
        <div>
          <p className="section-kicker">Dashboard analytics</p>
          <h2>Welcome back, {user?.name}</h2>
          <p>Your finance summary at a glance.</p>
        </div>
        <div className="hero-metrics">
          <div className="hero-metric">
            <span>Role</span>
            <strong>{user?.role}</strong>
          </div>
          <div className="hero-metric">
            <span>Status</span>
            <strong>{user?.status}</strong>
          </div>
        </div>
      </article>

      {isLoading ? <LoadingState message="Loading dashboard..." /> : null}
      {!isLoading && error ? (
        <ErrorState message={error} title="Could not load dashboard" />
      ) : null}

      {!isLoading && !error ? (
        <>
          <SummaryCards summary={summary} />
          <div className="dashboard-grid">
            <CategoryBreakdown categories={categories} />
            <TrendList trends={trends} />
          </div>
        </>
      ) : null}
    </section>
  );
}

export default DashboardPage;
