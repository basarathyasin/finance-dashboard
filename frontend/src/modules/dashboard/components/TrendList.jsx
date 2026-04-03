import EmptyState from "../../../components/EmptyState";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatMonth(value) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function TrendList({ trends }) {
  return (
    <article className="table-card">
      <div className="table-header">
        <h3>Monthly trends</h3>
        <p>Income, expense, and balance by month.</p>
      </div>

      {trends.length === 0 ? (
        <EmptyState
          message="Add records across dates to unlock monthly trends."
          title="No trends available"
        />
      ) : (
        <div className="trend-list">
          {trends.map((trend) => (
            <div className="trend-card" key={trend.month}>
              <div className="trend-card-main">
                <span className="stat-label">Month</span>
                <strong>{formatMonth(trend.month)}</strong>
              </div>
              <div className="trend-metrics">
                <div className="trend-metric trend-metric-income">
                  <small>Income</small>
                  <strong>{formatCurrency(trend.income)}</strong>
                </div>
                <div className="trend-metric trend-metric-expense">
                  <small>Expense</small>
                  <strong>{formatCurrency(trend.expense)}</strong>
                </div>
                <div
                  className={
                    trend.netBalance >= 0
                      ? "trend-metric trend-metric-balance-positive"
                      : "trend-metric trend-metric-balance-negative"
                  }
                >
                  <small>Net</small>
                  <strong>{formatCurrency(trend.netBalance)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default TrendList;
