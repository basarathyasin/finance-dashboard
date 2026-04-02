function UsersTable({ users, onRoleChange, onStatusToggle, updatingKey }) {
  if (users.length === 0) {
    return (
      <div className="empty-state-card">
        <h3>No users found</h3>
        <p>User accounts will appear here once they are created.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Users management</h3>
        <p>Manage roles and activation state for all users.</p>
      </div>

      <div className="table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const roleKey = `${user.id}-role`;
              const statusKey = `${user.id}-status`;

              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="role-badge">{user.role}</span>
                  </td>
                  <td>
                    <span
                      className={
                        user.status === "active"
                          ? "status-badge status-badge-active"
                          : "status-badge status-badge-inactive"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <select
                        className="inline-select"
                        defaultValue={user.role}
                        disabled={updatingKey === roleKey}
                        onChange={(event) => onRoleChange(user, event.target.value)}
                      >
                        <option value="viewer">viewer</option>
                        <option value="analyst">analyst</option>
                        <option value="admin">admin</option>
                      </select>
                      <button
                        className="ghost-button"
                        disabled={updatingKey === statusKey}
                        onClick={() => onStatusToggle(user)}
                        type="button"
                      >
                        {updatingKey === statusKey
                          ? "Saving..."
                          : user.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
