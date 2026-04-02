import { useEffect } from "react";
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
      <article className="stat-card stat-card-wide">
        <p className="section-kicker">Dashboard analytics</p>
        <h2>Live finance analytics for {user?.name}</h2>
        <p>
          This dashboard reads income, expense, category, and trend data directly
          from the backend analytics endpoints through the shared fetch service.
        </p>
      </article>

      {isLoading ? <div className="empty-state-card">Loading dashboard...</div> : null}
      {!isLoading && error ? (
        <div className="empty-state-card">
          <h3>Could not load dashboard</h3>
          <p>{error}</p>
        </div>
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
