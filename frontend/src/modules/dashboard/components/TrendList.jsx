function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function TrendList({ trends }) {
  return (
    <article className="table-card">
      <div className="table-header">
        <h3>Monthly trends</h3>
        <p>Income, expense, and net balance over time.</p>
      </div>

      {trends.length === 0 ? (
        <p className="empty-copy">No trends available yet.</p>
      ) : (
        <div className="trend-list">
          {trends.map((trend) => (
            <div className="trend-card" key={trend.month}>
              <div>
                <span className="stat-label">Month</span>
                <strong>{trend.month}</strong>
              </div>
              <div className="trend-metrics">
                <span>Income: {formatCurrency(trend.income)}</span>
                <span>Expense: {formatCurrency(trend.expense)}</span>
                <span>Net: {formatCurrency(trend.netBalance)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default TrendList;
