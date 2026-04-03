function RecordsFilterBar({ filters, onChange, onSubmit, onReset }) {
  return (
    <form className="toolbar-card records-filter-bar" onSubmit={onSubmit}>
      <div className="toolbar-copy">
        <p className="section-kicker">Quick filters</p>
        <h3>Filter records</h3>
      </div>

      <label className="form-field compact-field">
        <span>Type</span>
        <select name="type" onChange={onChange} value={filters.type}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="form-field compact-field">
        <span>Category</span>
        <input
          name="category"
          onChange={onChange}
          placeholder="salary, food, fuel..."
          type="text"
          value={filters.category}
        />
      </label>

      <label className="form-field compact-field">
        <span>Date</span>
        <input name="date" onChange={onChange} type="date" value={filters.date} />
      </label>

      <div className="filter-actions">
        <button className="primary-button" type="submit">
          Apply
        </button>
        <button className="ghost-button" onClick={onReset} type="button">
          Reset
        </button>
      </div>
    </form>
  );
}

export default RecordsFilterBar;
