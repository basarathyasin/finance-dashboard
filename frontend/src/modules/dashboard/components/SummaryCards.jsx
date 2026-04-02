function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function SummaryCards({ summary }) {
  return (
    <div className="summary-grid">
      <article className="stat-card">
        <span className="stat-label">Total income</span>
        <strong>{formatCurrency(summary.totalIncome)}</strong>
      </article>

      <article className="stat-card">
        <span className="stat-label">Total expense</span>
        <strong>{formatCurrency(summary.totalExpense)}</strong>
      </article>

      <article className="stat-card">
        <span className="stat-label">Net balance</span>
        <strong>{formatCurrency(summary.netBalance)}</strong>
      </article>
    </div>
  );
}

export default SummaryCards;
