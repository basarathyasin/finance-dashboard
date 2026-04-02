import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";

function UsersPage() {
  const { users, isLoading, error, loadUsers, updateUser } = useUsers();
  const [actionError, setActionError] = useState("");
  const [updatingKey, setUpdatingKey] = useState("");

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  async function handleRoleChange(user, nextRole) {
    if (nextRole === user.role) {
      return;
    }

    setActionError("");
    setUpdatingKey(`${user.id}-role`);

    try {
      await updateUser(user.id, { role: nextRole });
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setUpdatingKey("");
    }
  }

  async function handleStatusToggle(user) {
    const nextStatus = user.status === "active" ? "inactive" : "active";

    setActionError("");
    setUpdatingKey(`${user.id}-status`);

    try {
      await updateUser(user.id, { status: nextStatus });
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setUpdatingKey("");
    }
  }

  return (
    <section className="dashboard-page">
      <article className="stat-card stat-card-wide">
        <p className="section-kicker">Admin controls</p>
        <h2>Manage user roles and account state</h2>
        <p>
          This page is visible only to admin users and uses the backend admin-only
          users APIs for updates.
        </p>
      </article>

      {isLoading ? <div className="empty-state-card">Loading users...</div> : null}
      {!isLoading && error ? (
        <div className="empty-state-card">
          <h3>Could not load users</h3>
          <p>{error}</p>
        </div>
      ) : null}
      {!isLoading && !error ? (
        <>
          {actionError ? (
            <div className="empty-state-card">
              <h3>Update failed</h3>
              <p>{actionError}</p>
            </div>
          ) : null}

          <UsersTable
            onRoleChange={handleRoleChange}
            onStatusToggle={handleStatusToggle}
            updatingKey={updatingKey}
            users={users}
          />
        </>
      ) : null}
    </section>
  );
}

export default UsersPage;
