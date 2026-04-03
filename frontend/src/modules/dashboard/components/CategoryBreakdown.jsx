import EmptyState from "../../../components/EmptyState";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function CategoryBreakdown({ categories }) {
  return (
    <article className="table-card">
      <div className="table-header">
        <h3>Category breakdown</h3>
        <p>See where cash is coming from and where it is going.</p>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          message="Add some records to see category totals here."
          title="No category data available"
        />
      ) : (
        <div className="table-wrapper">
          <table className="records-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Total amount</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={`${category.type}-${category.category}`}>
                  <td>
                    <span className={`type-pill type-pill-${category.type}`}>
                      {category.type}
                    </span>
                  </td>
                  <td>{category.category}</td>
                  <td>{formatCurrency(category.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

export default CategoryBreakdown;
