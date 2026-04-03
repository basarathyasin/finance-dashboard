function UserCreateForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
}) {
  return (
    <div className="records-form-card">
      <div className="records-form-head">
        <h3>Create user</h3>
        <p>Add a new user account.</p>
      </div>

      <form className="records-form" onSubmit={onSubmit}>
        <label className="form-field">
          <span>Name</span>
          <input
            name="name"
            onChange={onChange}
            placeholder="Full name"
            type="text"
            value={formData.name}
            required
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            name="email"
            onChange={onChange}
            placeholder="user@example.com"
            type="email"
            value={formData.email}
            required
          />
        </label>

        <label className="form-field">
          <span>Password</span>
          <input
            name="password"
            onChange={onChange}
            placeholder="Temporary password"
            type="password"
            value={formData.password}
            required
          />
        </label>

        <label className="form-field">
          <span>Role</span>
          <select name="role" onChange={onChange} value={formData.role}>
            <option value="viewer">viewer</option>
            <option value="analyst">analyst</option>
            <option value="admin">admin</option>
          </select>
        </label>

        <label className="form-field">
          <span>Status</span>
          <select name="status" onChange={onChange} value={formData.status}>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating..." : "Create user"}
        </button>
      </form>
    </div>
  );
}

export default UserCreateForm;
