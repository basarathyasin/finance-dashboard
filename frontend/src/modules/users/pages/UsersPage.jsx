import { useEffect, useState } from "react";
import ErrorState from "../../../components/ErrorState";
import LoadingState from "../../../components/LoadingState";
import { useAuth } from "../../auth/hooks/useAuth";
import UserCreateForm from "../components/UserCreateForm";
import UsersTable from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";

const emptyUserForm = {
  name: "",
  email: "",
  password: "",
  role: "viewer",
  status: "active",
};

function UsersPage() {
  const { user: currentUser } = useAuth();
  const { users, isLoading, error, loadUsers, createUser, updateUser } = useUsers();
  const [formData, setFormData] = useState(emptyUserForm);
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [actionError, setActionError] = useState("");
  const [updatingKey, setUpdatingKey] = useState("");

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleCreateUser(event) {
    event.preventDefault();
    setCreateError("");
    setIsCreating(true);

    try {
      await createUser(formData);
      setFormData(emptyUserForm);
    } catch (requestError) {
      setCreateError(requestError.message);
    } finally {
      setIsCreating(false);
    }
  }

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
      <article className="hero-card">
        <div>
          <p className="section-kicker">Admin controls</p>
          <h2>Manage users</h2>
          <p>Create users and control roles.</p>
        </div>
        <div className="hero-metrics">
          <div className="hero-metric">
            <span>Total users</span>
            <strong>{users.length}</strong>
          </div>
          <div className="hero-metric">
            <span>Your role</span>
            <strong>{currentUser?.role}</strong>
          </div>
        </div>
      </article>

      {isLoading ? <LoadingState message="Loading users..." /> : null}
      {!isLoading && error ? (
        <ErrorState message={error} title="Could not load users" />
      ) : null}
      {!isLoading && !error ? (
        <>
          <div className="records-layout">
            <UserCreateForm
              error={createError}
              formData={formData}
              isSubmitting={isCreating}
              onChange={handleChange}
              onSubmit={handleCreateUser}
            />

            <div className="records-content">
              {actionError ? (
                <ErrorState message={actionError} title="Update failed" />
              ) : null}

              <UsersTable
                currentUserId={currentUser?.id}
                onRoleChange={handleRoleChange}
                onStatusToggle={handleStatusToggle}
                updatingKey={updatingKey}
                users={users}
              />
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default UsersPage;
