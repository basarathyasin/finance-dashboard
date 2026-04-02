function RecordForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  submitLabel,
  title,
}) {
  return (
    <div className="records-form-card">
      <div className="records-form-head">
        <h3>{title}</h3>
        <p>Capture amount, type, category, date, and notes in one place.</p>
      </div>

      <form className="records-form" onSubmit={onSubmit}>
        <label className="form-field">
          <span>Amount</span>
          <input
            min="0"
            name="amount"
            onChange={onChange}
            placeholder="0"
            step="0.01"
            type="number"
            value={formData.amount}
            required
          />
        </label>

        <label className="form-field">
          <span>Type</span>
          <select name="type" onChange={onChange} value={formData.type} required>
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="form-field">
          <span>Category</span>
          <input
            name="category"
            onChange={onChange}
            placeholder="salary, food, rent..."
            type="text"
            value={formData.category}
            required
          />
        </label>

        <label className="form-field">
          <span>Date</span>
          <input name="date" onChange={onChange} type="date" value={formData.date} required />
        </label>

        <label className="form-field records-note-field">
          <span>Note</span>
          <textarea
            name="note"
            onChange={onChange}
            placeholder="Optional note"
            rows="4"
            value={formData.note}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="records-form-actions">
          <button className="primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
          {onCancel ? (
            <button className="ghost-button" onClick={onCancel} type="button">
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default RecordForm;
