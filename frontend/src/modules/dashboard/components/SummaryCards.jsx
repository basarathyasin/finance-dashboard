function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function SummaryCards({ summary }) {
  const cards = [
    {
      label: "Total income",
      value: formatCurrency(summary.totalIncome),
      tone: "income",
    },
    {
      label: "Total expense",
      value: formatCurrency(summary.totalExpense),
      tone: "expense",
    },
    {
      label: "Net balance",
      value: formatCurrency(summary.netBalance),
      tone: summary.netBalance >= 0 ? "balance-positive" : "balance-negative",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <article className={`stat-card stat-card-${card.tone}`} key={card.label}>
          <span className="stat-label">{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}

export default SummaryCards;
