function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function RecordsTable({ records, onEdit, onDelete, deletingId }) {
  if (records.length === 0) {
    return (
      <div className="empty-state-card">
        <h3>No records found</h3>
        <p>Create a record or adjust your filters to see matching transactions.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Records</h3>
        <p>{records.length} transaction(s) loaded</p>
      </div>

      <div className="table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>
                  <span className={`type-pill type-pill-${record.type}`}>
                    {record.type}
                  </span>
                </td>
                <td>{record.category}</td>
                <td>{formatCurrency(record.amount)}</td>
                <td>{formatDate(record.date)}</td>
                <td>{record.note || "-"}</td>
                <td>
                  <div className="table-actions">
                    <button className="ghost-button" onClick={() => onEdit(record)} type="button">
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      disabled={deletingId === record.id}
                      onClick={() => onDelete(record)}
                      type="button"
                    >
                      {deletingId === record.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecordsTable;
